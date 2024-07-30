using System.Security.Claims;
using timetracker.Server.API.Auth.Models;

namespace timetracker.Server.Application.Interfaces
{
    public interface IJwtTokenUtils
    {
        string GenerateToken(Claim[] claims, DateTime expiresAt);
        ClaimsPrincipal? ValidateToken(string token);
        TokenResponse GenerateAccessToken(string Email);
        Task AssignRefreshToken(string email, string tokenHash);
        Task RevokeRefreshToken(string email, string tokenHash);
    }
}
