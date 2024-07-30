namespace timetracker.Server.API.Auth.Models
{
    public record TokenResponse
    (
        string Token,
        long ExpiresAt
    );
}
