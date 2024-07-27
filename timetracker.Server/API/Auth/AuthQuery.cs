using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Domain.Exceptions;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Auth
{
    public class AuthQuery : ObjectGraphType
    {
        public AuthQuery(
            IUserRepository userRepository, 
            IJwtTokenUtils jwtTokenUtils, 
            IPasswordHasher passwordHasher)
        {
            Field<LoginResponseType>("Login")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "Email" },
                    new QueryArgument<StringGraphType> { Name = "Password" })
                )
                .ResolveAsync(async context =>
                {
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

                    var token = jwtTokenUtils.GenerateToken(user.Email);

                    return new LoginResponse(
                        user,
                        token
                    );
                });
        }
    }
}
