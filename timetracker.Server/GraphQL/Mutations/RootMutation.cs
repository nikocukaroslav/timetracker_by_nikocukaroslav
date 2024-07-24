using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using timetracker.Server.Authentication;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Exceptions;
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
                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();

                    var email = context.GetArgument<string>("email");
                    var password = context.GetArgument<string>("password");

                    var user = await userRepository.GetUserByEmailAsync(email);

                    if (user == null || !passwordHasher.VerifyHash(password, user.Password))
                    {
                        context.Errors.Add(new ExecutionError("Invalid credentials")
                        {
                            Code = ExceptionsCode.INVALID_CREDENTIALS.ToString(),
                        });
                        return null;
                    }

                    var claims = new List<Claim>
                    {
                        new Claim("email", user.Email),
                        new Claim("id", user.Id.ToString())
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                    await _httpContextAccessor.HttpContext.SignInAsync(claimsPrincipal);

                    return "Login Successful!";

                });

            Field<UserType>("AddUser")
                .Arguments(new QueryArguments(new QueryArgument<UserInputType> { Name = "user" }))
                .ResolveAsync(async context =>
                {
                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();

                    Users user = context.GetArgument<Users>("user");

                    user.Password = passwordHasher.HashPassword(user.Password);

                    return await userRepository.AddAsync(user);
                });
        }
    }
}
