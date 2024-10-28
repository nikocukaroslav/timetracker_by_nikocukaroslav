using System.Security.Claims;
using timetracker.Server.API.Auth.Models;

namespace timetracker.Server.Application.Interfaces
{
    public interface IJwtTokenUtils
    {
        string? GetAuthenticatedUserEmail();
        TokenResponse GenerateToken(Claim[] claims, int expireMinutes);
        ClaimsPrincipal? ValidateToken(string token);
        TokenResponse GenerateAccessToken(string Email);
        Task<TokenResponse> GenerateRefreshToken(string email, string tokenHash);
        Task RevokeRefreshToken(string email, string tokenHash);
    }
}
