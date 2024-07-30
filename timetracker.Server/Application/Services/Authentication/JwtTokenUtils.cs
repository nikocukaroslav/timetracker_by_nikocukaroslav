using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Application.Services.Authentication
{
    public class JwtTokenUtils : IJwtTokenUtils
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JwtTokenUtils(
            IOptions<JwtSettings> jwtOptions, 
            IUserRepository userRepository, 
            IHttpContextAccessor httpContextAccessor)
        {
            _jwtSettings = jwtOptions.Value;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GenerateToken(Claim[] claims, DateTime expiresAt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiresAt,
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal? ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _jwtSettings.Issuer,
                ValidateAudience = true,
                ValidAudience = _jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
            }, out _);
        }

        public TokenResponse GenerateAccessToken(string email)
        {
            var expiresAt = DateTime.Now.AddMinutes(_jwtSettings.AccessTokenExpiryMinutes);

            var accessToken = GenerateToken(
                [ new(ClaimTypes.Email, email) ],
                expiresAt
            );

            var expiresAtTimeStamp = new DateTimeOffset(expiresAt).ToUnixTimeMilliseconds();

            return new TokenResponse(accessToken, expiresAtTimeStamp);
        }

        public async Task AssignRefreshToken(string email, string tokenHash)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
            {
                throw new Exception();
            }

            if (user.RefreshTokenHash != tokenHash)
            {
                throw new Exception();
            }

            var newTokenHash = Convert.ToHexString(RandomNumberGenerator.GetBytes(16));
            user.RefreshTokenHash = newTokenHash;

            await _userRepository.UpdateAsync(user);

            var expiresAt = DateTime.Now.AddMinutes(_jwtSettings.RefreshTokenExpiryMinutes);

            var refreshToken = GenerateToken(
                [
                    new(ClaimTypes.Email, email),
                    new("hash", newTokenHash)
                ],
                expiresAt
            );

            var options = new CookieOptions()
            {
                Expires = expiresAt,
                HttpOnly = true,
                Secure = true,
            };

            _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken, options);
        }

        public async Task RevokeRefreshToken(string email, string tokenHash)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
            {
                throw new Exception();
            }

            if (user.RefreshTokenHash != tokenHash)
            {
                throw new Exception();
            }

            user.RefreshTokenHash = null;

            await _userRepository.UpdateAsync(user);

            _httpContextAccessor.HttpContext.Response.Cookies.Delete("refreshToken");
        }
    }
}
