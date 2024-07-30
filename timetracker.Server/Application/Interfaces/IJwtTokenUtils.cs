using System.Security.Claims;
using timetracker.Server.API.Auth.Models;

namespace timetracker.Server.Application.Interfaces
{
    public interface IJwtTokenUtils
    {
        string GenerateToken(Claim[] claims, DateTime expiresAt);
        TokenResponse GenerateAccessToken(string Email);
        string GenerateRefreshToken(string Email, string refreshTokenHash);
    }
}
