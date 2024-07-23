using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Repositories;
using timetracker.Server.GraphQL.Types;

namespace timetracker.Server.GraphQL.Mutations
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation(IUserRepository userRepository, IHttpContextAccessor _httpContextAccessor)
        {
            Field<StringGraphType>("Login")
                .Arguments(new QueryArguments(new QueryArgument<StringGraphType> { Name = "Email" },
                                            new QueryArgument<StringGraphType> { Name = "Password" }))
                .ResolveAsync(async context =>
                {
                    try
                    {
                        var email = context.GetArgument<string>("email");
                        var password = context.GetArgument<string>("password");

                        var user = await userRepository.GetUserByEmailAsync(email);

                        if (user == null)
                        {
                            throw new ValidationError("", "400", "Invalid credentials");
                        }

                        if (user.Password != password)
                        {
                            throw new ValidationError("", "400", "Invalid credentials");
                        }

                        var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim("id", user.Id.ToString())
                };

                        var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
                        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                        await _httpContextAccessor.HttpContext.SignInAsync(claimsPrincipal);

                        return "Login Successful!";
                    }
                    catch (ValidationError ex)
                    {
                        context.Errors.Add(ex);
                        return "Invalid credentials";
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new ExecutionError(ex.Message));
                        return "Unknown error";
                    }
                });

            Field<UserType>("AddUser")
                .Arguments(new QueryArguments(new QueryArgument<UserInputType>
            {
                Name = "user"
            }))
                .ResolveAsync(async context =>
            {
                Users user = context.GetArgument<Users>("user");
                return await userRepository.AddAsync(user);
            });
        }
    }
}
