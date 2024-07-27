using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.Auth.Models
{
    public record LoginResponse(
         UserModel User,
         string Token
    );
}
