using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Domain.Exceptions;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Auth
{
    public class AuthMutation : ObjectGraphType
    {
        public AuthMutation(
            IUserRepository userRepository,
            IJwtTokenUtils jwtTokenUtils,
            IPasswordHasher passwordHasher,
            IHttpContextAccessor httpContextAccessor)
        {
            Field<LoginResponseType>("Login")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "Email" },
                    new QueryArgument<StringGraphType> { Name = "Password" }
                ))
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

                    var accessToken = jwtTokenUtils.GenerateAccessToken(user.Email);
                    var refreshToken = await jwtTokenUtils.GenerateRefreshToken(email, user.RefreshTokenHash);

                    return new LoginResponse(
                        user,
                        accessToken,
                        refreshToken
                    );
                });

            Field<LoginResponseType>("Authorize")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "RefreshToken" }
                ))
                .ResolveAsync(async context =>
                {
                    try
                    {
                        var refreshToken = context.GetArgument<string>("refreshToken");

                        var principal = jwtTokenUtils.ValidateToken(refreshToken);

                        var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                        var refreshTokenHash = principal.FindFirst("hash")?.Value;

                        var user = await userRepository.GetUserByEmailAsync(email) ?? throw new Exception();

                        var newAccessToken = jwtTokenUtils.GenerateAccessToken(email);
                        var newRefreshToken = await jwtTokenUtils.GenerateRefreshToken(email, refreshTokenHash);

                        return new LoginResponse(
                            user,
                            newAccessToken,
                            newRefreshToken
                        );
                    }
                    catch
                    {
                        context.Errors.Add(new ExecutionError("Unauthorized")
                        {
                            Code = ExceptionsCode.UNAUTHORIZED.ToString(),
                        });
                        return null;
                    }
                });

            Field<RefreshTokenResponseType>("RefreshToken")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "RefreshToken" }
                ))
               .ResolveAsync(async context =>
               {
                   try
                   {
                       var refreshToken = context.GetArgument<string>("refreshToken");

                       var principal = jwtTokenUtils.ValidateToken(refreshToken);

                       var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                       var refreshTokenHash = principal.FindFirst("hash")?.Value;

                       var newAccessToken = jwtTokenUtils.GenerateAccessToken(email);
                       var newRefreshToken = await jwtTokenUtils.GenerateRefreshToken(email, refreshTokenHash);

                       return new RefreshTokenResponse(newAccessToken, newRefreshToken);
                   }
                   catch
                   {
                       context.Errors.Add(new ExecutionError("Unauthorized")
                       {
                           Code = ExceptionsCode.UNAUTHORIZED.ToString(),
                       });
                       return null;
                   }
               });


            Field<BooleanGraphType>("Logout")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "RefreshToken" }
                ))
                .ResolveAsync(async context =>
                {
                    try
                    {
                        var refreshToken = context.GetArgument<string>("refreshToken");

                        var principal = jwtTokenUtils.ValidateToken(refreshToken);

                        var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                        var refreshTokenHash = principal.FindFirst("hash")?.Value;

                        await jwtTokenUtils.RevokeRefreshToken(email, refreshTokenHash);

                        return true;
                    }
                    catch
                    {
                        context.Errors.Add(new ExecutionError("Unauthorized")
                        {
                            Code = ExceptionsCode.UNAUTHORIZED.ToString(),
                        });

                        return null;
                    }
                });
        }
    }
}
