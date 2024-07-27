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
                    Entities.User user = context.GetArgument<Entities.User>("user");

                    if (user is null)
                    {
                        context.Errors.Add(new ExecutionError("Invalid credentials")
                        {
                            Code = ExceptionsCode.INVALID_CREDENTIALS.ToString(),
                        });
                        return null;
                    }

                    if (await userRepository.GetUserByEmailAsync(user.Email) != null)
                    {
                        context.Errors.Add(new ExecutionError("This email is already registered")
                        {
                            Code = ExceptionsCode.EMAIL_EXIST.ToString(),
                        });
                        return null;
                    }

                    if (user.Password.Length < 8 || user.Password.Length > 20)
                    {
                        context.Errors.Add(new ExecutionError("Password must be between 8 and 20 characters")
                        {
                            Code = ExceptionsCode.INVALID_PASSWORD_LENGTH.ToString(),
                        });
                        return null;
                    }

                    var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
                    if (!emailRegex.IsMatch(user.Email))
                    {
                        context.Errors.Add(new ExecutionError("Invalid email format")
                        {
                            Code = ExceptionsCode.INVALID_EMAIL_FORMAT.ToString(),
                        });
                        return null;
                    }

                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();
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
