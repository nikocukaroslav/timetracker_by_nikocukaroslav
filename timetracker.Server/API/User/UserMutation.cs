using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.User.Types;
using Entities = timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Infrastructure.Interfaces;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.API.User.Models;
using timetracker.Server.Application.Services;

namespace timetracker.Server.API.User
{
    public class UserMutation : ObjectGraphType
    {
        public UserMutation(IUserRepository userRepository, IEmailSender emailSender)
        {
            Field<UserResponseType>("createUser")
                .AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString())
                .Arguments(new QueryArguments(new QueryArgument<CreateUserRequestType> { Name = "user" }))
                .ResolveAsync(async context =>
                {
                    var userInput = context.GetArgument<CreateUserRequest>("user");

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

                    if (await userRepository.GetUserByEmailAsync(userInput.Email) != null)
                    {
                        context.Errors.Add(ErrorCode.EMAIL_EXIST);
                        return null;
                    }

                    var emailSender = new EmailSender();

                    var password = PasswordGenerator.GeneratePassword();

                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();
                    var hashPasswordResponce = passwordHasher.HashPassword(password);

                    var user = new Entities.User()
                    {
                        Name = userInput.Name,
                        Surname = userInput.Surname,
                        Email = userInput.Email,
                        Password = hashPasswordResponce.Password,
                        Salt = hashPasswordResponce.Salt,
                        Timeload = userInput.Timeload.ToTimeSpan(),
                        Position = userInput.Position,
                        IsEmployed = true,
                        Permissions = string.Join(",", userInput.Permissions)
                    };

                    await emailSender.SendEmailAsync(user.Email,
                    $"Welcome to the company, {user.Name}",
                    $"Your password: {password}");

                    return await userRepository.CreateAsync(user);
                });

            Field<UserResponseType>("updateUser")
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
                     user.Timeload = updateInput.Timeload?.ToTimeSpan() ?? user.Timeload;
                     user.Status = updateInput.Status ?? user.Status;
                     user.IsEmployed = updateInput.IsEmployed ?? user.IsEmployed;
                     if (updateInput.Permissions != null)
                     {
                         user.Permissions = string.Join(",", updateInput.Permissions);
                     }

                     return await userRepository.UpdateAsync(user);
                 });

            Field<BooleanGraphType>("deleteUser")
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
        }
    }
}
