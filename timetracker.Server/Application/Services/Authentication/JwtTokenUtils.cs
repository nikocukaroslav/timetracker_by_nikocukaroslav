using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.Application.Interfaces;

namespace timetracker.Server.Application.Services.Authentication
{
    public class JwtTokenUtils : IJwtTokenUtils
    {
        private readonly JwtSettings _jwtSettings;

        public JwtTokenUtils(IOptions<JwtSettings> jwtOptions)
        {
            _jwtSettings = jwtOptions.Value;
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

        public TokenResponse GenerateAccessToken(string Email)
        {
            var accessExpiresAt = DateTime.Now.AddMinutes(_jwtSettings.AccessTokenExpiryMinutes);
            var accessToken = GenerateToken(
                [
                    new(ClaimTypes.Email, Email)
                ],
                 accessExpiresAt);

            var accessExpiresAtTimeStamp = new DateTimeOffset(accessExpiresAt).ToUnixTimeMilliseconds();
            var tokenResponse = new TokenResponse(accessToken, accessExpiresAtTimeStamp);
            return tokenResponse;
        }

        public string GenerateRefreshToken(string Email, string refreshTokenHash)
        {
            var refreshExpiresAt = DateTime.Now.AddMinutes(_jwtSettings.RefreshTokenExpiryMinutes);

            var refreshToken = GenerateToken(
                [
                    new(ClaimTypes.Email, Email),
                    new("hash", refreshTokenHash)
                ],
                refreshExpiresAt);

            return refreshToken;
        }
    }
}
