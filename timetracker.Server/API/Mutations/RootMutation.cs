using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Exceptions;
using timetracker.Server.API.Types;
using timetracker.Server.Infrastructure.Authentication;
using timetracker.Server.Infrastructure.Repositories.Interfaces;

namespace timetracker.Server.API.Mutations
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation(IUserRepository userRepository, IJwtTokenUtils jwtTokenUtils)
        {
            Field<StringGraphType>("Login")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "Email" },
                    new QueryArgument<StringGraphType> { Name = "Password" })
                )
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
                        new Claim("id", user.Id.ToString())
                    };

                    var token = jwtTokenUtils.GenerateToken(user.Id);

                    return token;
                });

            Field<UserType>("AddUser")
                .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString())
                .Arguments(new QueryArguments(new QueryArgument<UserInputType> { Name = "user" }))
                .ResolveAsync(async context =>
                {
                    var passwordHasher = context.RequestServices.GetRequiredService<IPasswordHasher>();

                    Users user = context.GetArgument<Users>("user");

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
