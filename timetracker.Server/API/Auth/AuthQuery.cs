using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.API.User.Types;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Domain.Exceptions;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Auth
{
    [Authorize]
    public class AuthQuery : ObjectGraphType
    {
        public AuthQuery(
            IUserRepository userRepository)
        {
            Field<UserType>("Authorize").
                ResolveAsync(async context =>
                {
                    var email = context.User?.FindFirst(ClaimTypes.Email)?.Value;

                    var user = await userRepository.GetUserByEmailAsync(email);

                    if (user == null)
                    {
                        context.Errors.Add(new ExecutionError("User is not found")
                        {
                            Code = ExceptionsCode.USER_NOT_FOUND.ToString(),
                        });
                        return null;
                    }

                    return user;
                });
        }
    }
}
