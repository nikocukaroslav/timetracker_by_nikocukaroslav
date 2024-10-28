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
    public class JwtTokenUtils : 
        IJwtTokenUtils
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
        public string? GetAuthenticatedUserEmail()
        {
            var authorizationHeader = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();

            if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader.Substring("Bearer ".Length).Trim();
                var claimsPrincipal = ValidateToken(token);

                if (claimsPrincipal != null && claimsPrincipal.Identity.IsAuthenticated)
                {
                    var emailClaim = claimsPrincipal.FindFirst(ClaimTypes.Email);
                    return emailClaim?.Value;
                }
            }

            return null;
        }


        public TokenResponse GenerateToken(Claim[] claims, int expireMinutes)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.Now.AddMinutes(expireMinutes);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var responseToken = tokenHandler.WriteToken(token);

            var expiresAtTimeStamp = new DateTimeOffset(expires).ToUnixTimeMilliseconds();

            return new TokenResponse(responseToken, expiresAtTimeStamp);
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
            var accessToken = GenerateToken(
                [ new(ClaimTypes.Email, email) ],
                _jwtSettings.AccessTokenExpiryMinutes
            );

            return accessToken;
        }

        public async Task<TokenResponse> GenerateRefreshToken(string email, string tokenHash)
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

            var refreshToken = GenerateToken(
                [
                    new(ClaimTypes.Email, email),
                    new("hash", newTokenHash)
                ],
                _jwtSettings.RefreshTokenExpiryMinutes
            );

            return refreshToken;
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
        }
    }
}
