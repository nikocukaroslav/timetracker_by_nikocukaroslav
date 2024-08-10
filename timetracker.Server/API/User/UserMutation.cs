using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.User.Types;
using Entities = timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Infrastructure.Interfaces;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.API.User.Models;

namespace timetracker.Server.API.User
{
    public class UserMutation : ObjectGraphType
    {

        public UserMutation(IUserRepository userRepository)
        {
            Field<UserResponseType>("AddUser")
                .AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString())
                .Arguments(new QueryArguments(new QueryArgument<AddUserRequestType> { Name = "user" }))
                .ResolveAsync(async context =>
                {
                    var userInput = context.GetArgument<AddUserRequest>("user");

                    if (userInput is null)
                    {
                        context.Errors.Add(ErrorCode.INVALID_INPUT_DATA);
                        return null;
                    }

                    var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
                    if (!emailRegex.IsMatch(userInput.Email))
                    {
                        context.Errors.Add(ErrorCode.INVALID_EMAIL_FORMAT);
                        return null;
                    }

                    if (userInput.Password is null || userInput.Password.Length < 8 || userInput.Password.Length > 20)
                    {
                        context.Errors.Add(ErrorCode.INVALID_PASSWORD_LENGTH);
                        return null;
                    }

                    if (await userRepository.GetUserByEmailAsync(userInput.Email) != null)
                    {
                        context.Errors.Add(ErrorCode.EMAIL_EXIST);
                        return null;
                    }

                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();
                    var hashPasswordResponce = passwordHasher.HashPassword(userInput.Password);

                    var user = new Entities.User()
                    {
                        Name = userInput.Name,
                        Surname = userInput.Surname,
                        Email = userInput.Email,
                        Password = hashPasswordResponce.Password,
                        Salt = hashPasswordResponce.Salt,
                        Timeload = userInput.Timeload,
                        Position = userInput.Position,
                        IsEmployed = true,
                        Permissions = string.Join(",", userInput.Permissions)
                    };

                    return await userRepository.AddAsync(user);
                });

            Field<BooleanGraphType>("DeleteUser")
                .AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString())
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    Guid id = context.GetArgument<Guid>("id");
                    var user = await userRepository.GetByIdAsync(id);
                    if (user is null)
                    {
                        context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                        return null;
                    }

                    await userRepository.DeleteAsync(id);

                    return true;
                });

            Field<UserResponseType>("UpdateUser")
                 .AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString())
                 .Arguments(new QueryArguments(
                    new QueryArgument<UpdateUserRequestType> { Name = "user" })
                 )
                 .ResolveAsync(async context =>
                 {
                     var updateInput = context.GetArgument<UpdateUserRequest>("user");

                     var user = await userRepository.GetByIdAsync(updateInput.Id);

                     if (user is null)
                     {
                         context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                         return null;
                     }

                     user.Name = updateInput.Name ?? user.Name;
                     user.Surname = updateInput.Surname ?? user.Surname;
                     user.Position = updateInput.Position ?? user.Position;
                     user.Timeload = updateInput.Timeload ?? user.Timeload;
                     user.Status = updateInput.Status ?? user.Status;
                     user.IsEmployed = updateInput.IsEmployed ?? user.IsEmployed;
                     if (updateInput.Permissions != null)
                     {
                         user.Permissions = string.Join(",", updateInput.Permissions);
                     }

                     return await userRepository.UpdateAsync(user);
                 });
        }
    }
}
