using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.API.User.Types;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Application.Models;
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

                    if (user == null || !passwordHasher.VerifyHash(password, user.Password, user.Salt))
                    {
                        context.Errors.Add(new ExecutionError("Incorrect email or password")
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
            Field<UserType>("Authorize").
                ResolveAsync(async context =>
                {
                    var email = context.User?.FindFirst(ClaimTypes.Email)?.Value;

                    if(email == null)
                    {
                        context.Errors.Add(new ExecutionError("Token is not valid")
                        {
                            Code = ExceptionsCode.INVALID_TOKEN.ToString(),
                        });
                        return null;
                    }

                    var user = await userRepository.GetUserByEmailAsync (email);

                    if (user == null)
                    {
                        context.Errors.Add(new ExecutionError("User is not found")
                        {
                            Code = ExceptionsCode.USER_NOT_FOUND.ToString(),
                        });
                    }

                    if (context.Errors.Count > 0) return null;

                    return user;
                });
        }
    }
}
