namespace timetracker.Server.API.Auth.Models
{
    public record RefreshTokenResponse(
        TokenResponse AccessToken, 
        TokenResponse RefreshToken 
    );
}
