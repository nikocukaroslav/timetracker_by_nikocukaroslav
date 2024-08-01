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

                    await jwtTokenUtils.AssignRefreshToken(email, user.RefreshTokenHash);

                    var accessToken = jwtTokenUtils.GenerateAccessToken(user.Email);

                    return new LoginResponse(
                        user,
                        accessToken
                    );
                });

            Field<LoginResponseType>("Authorize")
                .ResolveAsync(async context =>
                {
                    try
                    {
                        httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("refreshToken", out string? refreshTokenCookie);

                        ClaimsPrincipal? principal = jwtTokenUtils.ValidateToken(refreshTokenCookie);

                        var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                        var refreshTokenHash = principal.FindFirst("hash")?.Value;

                        await jwtTokenUtils.AssignRefreshToken(email, refreshTokenHash);

                        var accessToken = jwtTokenUtils.GenerateAccessToken(email);

                        var user = await userRepository.GetUserByEmailAsync(email);

                        if (user == null)
                            throw new Exception();

                        return new LoginResponse(
                            user,
                            accessToken
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

            Field<TokenResponseType>("RefreshToken")
               .ResolveAsync(async context =>
               {
                   try
                   {
                       httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("refreshToken", out string? refreshTokenCookie);

                       ClaimsPrincipal? principal = jwtTokenUtils.ValidateToken(refreshTokenCookie);

                       var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                       var refreshTokenHash = principal.FindFirst("hash")?.Value;

                       await jwtTokenUtils.AssignRefreshToken(email, refreshTokenHash);

                       var accessToken = jwtTokenUtils.GenerateAccessToken(email);

                       return accessToken;
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
                .ResolveAsync(async context =>
                {
                    try
                    {
                        httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("refreshToken", out string? refreshTokenCookie);

                        ClaimsPrincipal? principal = jwtTokenUtils.ValidateToken(refreshTokenCookie);

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
