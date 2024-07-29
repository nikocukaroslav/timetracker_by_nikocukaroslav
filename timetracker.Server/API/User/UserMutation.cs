﻿using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.User.Types;
using Entities = timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Exceptions;
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
            Field<UserType>("AddUser")
                .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString())
                .Arguments(new QueryArguments(new QueryArgument<UserInputType> { Name = "user" }))
                .ResolveAsync(async context =>
                {
                    AddUserModel userInput = context.GetArgument<AddUserModel>("user");

                    if (userInput is null)
                    {
                        context.Errors.Add(new ExecutionError("Invalid credentials")
                        {
                            Code = ExceptionsCode.INVALID_CREDENTIALS.ToString(),
                        });
                        return null;
                    }

                    if (await userRepository.GetUserByEmailAsync(userInput.Email) != null)
                    {
                        context.Errors.Add(new ExecutionError("This email is already registered")
                        {
                            Code = ExceptionsCode.EMAIL_EXIST.ToString(),
                        });
                    }

                    if (userInput.Password.Length < 8 || userInput.Password.Length > 20)
                    {
                        context.Errors.Add(new ExecutionError("Password must be between 8 and 20 characters")
                        {
                            Code = ExceptionsCode.INVALID_PASSWORD_LENGTH.ToString(),
                        });
                    }

                    var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
                    if (!emailRegex.IsMatch(userInput.Email))
                    {
                        context.Errors.Add(new ExecutionError("Invalid email format")
                        {
                            Code = ExceptionsCode.INVALID_EMAIL_FORMAT.ToString(),
                        });
                    }

                    if (context.Errors.Count > 0) return null;

                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();
                    var hashPasswordResponce = passwordHasher.HashPassword(userInput.Password);


                    var user = new Entities.User()
                    {
                        Name = userInput.Name,
                        Surname = userInput.Surname,
                        Email = userInput.Email,
                        Password = hashPasswordResponce.Password,
                        Salt = hashPasswordResponce.Salt,
                        EmployeeType = userInput.EmployeeType,
                        Permissions = string.Join(",", userInput.Permissions)
                    };

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
            Field<UserType>("UpdateUserPermissions")
                 .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString())
                 .Arguments(new QueryArguments(new QueryArgument<ListGraphType<StringGraphType>> { Name = "permissions" },
                                               new QueryArgument<GuidGraphType> { Name = "id"}))
                 .ResolveAsync(async context =>
                 {
                     var permissions = string.Join(",", context.GetArgument<List<string>>("permissions"));
                     var id = context.GetArgument<Guid>("id");

                     var user = await userRepository.GetByIdAsync(id);

                     if(user is null)
                     {
                         context.Errors.Add(new ExecutionError("User is not found")
                         {
                             Code = ExceptionsCode.USER_NOT_FOUND.ToString(),
                         });
                         return null;
                     }

                     user.Permissions = permissions;

                     await userRepository.UpdateAsync(user);

                     return user;
                 });
        }
    }
}
