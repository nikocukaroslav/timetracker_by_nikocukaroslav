using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Application.Services;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Auth
{
    public class AuthMutation : ObjectGraphType
    {
        public AuthMutation(
            IUserRepository userRepository,
            IJwtTokenUtils jwtTokenUtils,
            IPasswordHasher passwordHasher)
        {
            base.Field<LoginResponseType>("login")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "email" },
                    new QueryArgument<StringGraphType> { Name = "password" }
                ))
                .ResolveAsync(async context =>
                {
                    var email = context.GetArgument<string>("email");

                    if (!DataValidator.IsEmailValid(email))
                    {
                        context.Errors.Add(ErrorCode.INVALID_EMAIL_FORMAT);
                        return null;
                    }

                    var password = context.GetArgument<string>("password");

                    if (!DataValidator.IsPasswordValid(password))
                    {
                        context.Errors.Add(ErrorCode.INVALID_PASSWORD_LENGTH);
                        return null;
                    }

                    var user = await userRepository.GetUserByEmailAsync(email);

                    if (user == null || !passwordHasher.VerifyHash(password, user.Password, user.Salt))
                    {
                        context.Errors.Add(ErrorCode.INVALID_CREDENTIALS);
                        return null;
                    }

                    if (!user.IsEmployed)
                    {
                        context.Errors.Add(ErrorCode.ACCOUNT_SUSPENDED);
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

            Field<AuthorizeResponseType>("authorize")
                .Arguments(new QueryArguments(new QueryArgument<StringGraphType> { Name = "refreshToken" }
                ))
                .ResolveAsync(async context =>
                {
                    try
                    {
                        var refreshToken = context.GetArgument<string>("refreshToken");

                        var principal = jwtTokenUtils.ValidateToken(refreshToken);

                        var refreshTokenHash = principal.FindFirst("hash")?.Value;

                        var email = principal.FindFirst(ClaimTypes.Email)?.Value;

                        var user = await userRepository.GetUserByEmailAsync(email) ?? throw new Exception();

                        if (user == null)
                        {
                            throw new Exception();
                        }

                        if (user.RefreshTokenHash != refreshTokenHash)
                        {
                            throw new Exception();
                        }

                        var newAccessToken = jwtTokenUtils.GenerateAccessToken(email);

                        return new AuthorizeResponse(
                            user,
                            newAccessToken
                        );
                    }
                    catch
                    {
                        context.Errors.Add(ErrorCode.UNAUTHORIZED);
                        return null;
                    }
                });

            Field<RefreshTokenResponseType>("refreshToken")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "refreshToken" }
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
                       context.Errors.Add(ErrorCode.UNAUTHORIZED);
                       return null;
                   }
               });

            Field<BooleanGraphType>("logout")
                .Arguments(new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "refreshToken" }
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
                        context.Errors.Add(ErrorCode.UNAUTHORIZED);

                        return null;
                    }
                });
        }
    }
}
