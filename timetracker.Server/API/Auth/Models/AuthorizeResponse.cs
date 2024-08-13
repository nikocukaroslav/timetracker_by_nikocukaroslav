using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.Auth.Models
{
    public record AuthorizeResponse(
         UserModel User,
         TokenResponse AccessToken
    );
}
