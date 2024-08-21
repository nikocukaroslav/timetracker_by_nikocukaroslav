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
        public UserMutation(IUserRepository userRepository,
            ITemporaryLinkRepository temporaryLinkRepository,
            IEmailSender emailSender, IConfiguration configuration)
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

                    var expires = DateTime.Now.AddDays(1);

                    var expiresAtTimeStamp = new DateTimeOffset(expires).ToUnixTimeMilliseconds();

                    var user = new Entities.User()
                    {
                        Name = userInput.Name,
                        Surname = userInput.Surname,
                        Email = userInput.Email,
                        Timeload = userInput.Timeload.ToTimeSpan(),
                        Position = userInput.Position,
                        IsEmployed = true,
                        Permissions = string.Join(",", userInput.Permissions)
                    };

                    var createdUser = await userRepository.CreateAsync(user);

                    var temporaryLink = new Entities.TemporaryLink()
                    {
                        ExpiresAt = expiresAtTimeStamp,
                        UserId = createdUser.Id,
                    };

                    var temporaryLinkToSend = await temporaryLinkRepository.CreateAsync(temporaryLink);

                    if (temporaryLinkToSend == null)
                    {
                        context.Errors.Add(ErrorCode.LINK_NOT_CREATED);
                        return null;
                    }

                    await emailSender.SendEmailAsync(user.Email,
                    $"Welcome to the company, {user.Name}",
                    $"Please, set your password: " +
                    $"{configuration.GetValue<string>("BaseUrl")}/auth/create-password/{temporaryLinkToSend.Id}");

                    return createdUser;
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

            Field<BooleanGraphType>("createPassword")
                .Arguments(new QueryArguments(new QueryArgument<CreatePasswordRequestType> { Name = "user" }))
                .ResolveAsync(async context =>
                {
                    var updateInput = context.GetArgument<CreatePasswordRequest>("user");

                    var temporaryLink = await temporaryLinkRepository
                    .GetByIdAsync(updateInput.TemporaryLinkId);

                    if (temporaryLink.ExpiresAt < new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds())
                    {
                        context.Errors.Add(ErrorCode.LINK_EXPIRED);
                        return null;
                    }

                    if (updateInput.Password is null || updateInput.Password.Length < 8
                    || updateInput.Password.Length > 20)
                    {
                        context.Errors.Add(ErrorCode.INVALID_PASSWORD_LENGTH);
                        return null;
                    }

                    var user = await userRepository.GetByIdAsync(temporaryLink.UserId);

                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();
                    var hashPasswordResponse = passwordHasher.HashPassword(updateInput.Password);

                    if (user is null)
                    {
                        context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                        return null;
                    }

                    user.Password = hashPasswordResponse.Password;
                    user.Salt = hashPasswordResponse.Salt;

                    await temporaryLinkRepository.DeleteAllAsync(updateInput.UserId);

                    return await userRepository.UpdateAsync(user) != null;
                });
        }
    }
}
