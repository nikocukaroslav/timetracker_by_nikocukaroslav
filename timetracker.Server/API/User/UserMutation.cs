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
            ITemporaryLinkRepository temporaryLinkRepository)
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

                    if (!DataValidator.IsEmailValid(userInput.Email))
                    {
                        context.Errors.Add(ErrorCode.INVALID_EMAIL_FORMAT);
                        return null;
                    }

                    if (await userRepository.GetUserByEmailAsync(userInput.Email) != null)
                    {
                        context.Errors.Add(ErrorCode.EMAIL_EXIST);
                        return null;
                    }

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

                    var emailSender = context.RequestServices.GetRequiredService<IEmailSender>();

                    await emailSender.SendCreatePasswordEmailAsync(createdUser);

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

                    var temporaryLink = await temporaryLinkRepository.GetByIdAsync(updateInput.TemporaryLinkId);

                    if (temporaryLink == null)
                    {
                        context.Errors.Add(ErrorCode.LINK_NOT_FOUND);
                        return null;
                    }

                    if (!DataValidator.IsTimeInFuture(temporaryLink.ExpiresAt))
                    {
                        context.Errors.Add(ErrorCode.LINK_EXPIRED);
                        return null;
                    }

                    if (!DataValidator.IsPasswordValid(updateInput.Password))
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

                    await temporaryLinkRepository.DeleteAllAsync(temporaryLink.UserId);

                    return await userRepository.UpdateAsync(user) != null;
                });

            Field<BooleanGraphType>("resendCreatePasswordEmail")
             .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "tokenId" }))
             .ResolveAsync(async context =>
             {
                 var tokenId = context.GetArgument<Guid>("tokenId");

                 var temporaryLink = await temporaryLinkRepository.GetByIdAsync(tokenId);

                 if (temporaryLink == null)
                 {
                     context.Errors.Add(ErrorCode.LINK_NOT_FOUND);
                     return null;
                 }

                 var createdUser = await userRepository.GetByIdAsync(temporaryLink.UserId);

                 if (createdUser == null)
                 {
                     context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                     return null;
                 }

                 await temporaryLinkRepository.DeleteAllAsync(temporaryLink.UserId);

                 var emailSender = context.RequestServices.GetRequiredService<IEmailSender>();

                 await emailSender.SendCreatePasswordEmailAsync(createdUser);

                 return true;
             });
        }
    }
}
