using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.User.Types;
using Entities = timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Exceptions;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Infrastructure.Interfaces;
using timetracker.Server.Application.Interfaces;

namespace timetracker.Server.API.User
{
    public class UserMutation : ObjectGraphType
    {
        public UserMutation(IUserRepository userRepository)
        {
            Field<UserType>("AddUser")
                .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString())
                .Arguments(new QueryArguments(new QueryArgument<UserInputType> { Name = "user" }))
                .ResolveAsync(async context =>
                {
                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();

                    Entities.User user = context.GetArgument<Entities.User>("user");

                    if (user == null)
                    {
                        context.Errors.Add(new ExecutionError("Invalid credentials")
                        {
                            Code = ExceptionsCode.INVALID_CREDENTIALS.ToString(),
                        });
                        return null;
                    }
                    user.Password = passwordHasher.HashPassword(user.Password);

                    return await userRepository.AddAsync(user);
                });
        }
    }
}
