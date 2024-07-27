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

                    if (user is null)
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
            Field<StringGraphType>("DeleteUser")
                .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString())
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    Guid id = context.GetArgument<Guid>("id");
                    var user = await userRepository.GetByIdAsync(id);
                    if (user is null)
                    {
                        context.Errors.Add(new ExecutionError("User is not found")
                        {
                            Code = ExceptionsCode.USER_NOT_FOUND.ToString(),
                        });
                        return null;
                    }

                    await userRepository.DeleteAsync(id);

                    return "User deleted successful";
                });
        }
    }
}
