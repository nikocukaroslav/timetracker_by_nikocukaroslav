using GraphQL;
using GraphQL.Types;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using timetracker.Server.API.Auth.Models;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.API.User.Types;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Application.Services.Authentication;
using timetracker.Server.Domain.Exceptions;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Auth
{
    public class AuthQuery : ObjectGraphType
    {
        public AuthQuery(
            IUserRepository userRepository,
            IJwtTokenUtils jwtTokenUtils,
            IPasswordHasher passwordHasher,
            IOptions<JwtSettings> jwtOptions,
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

                    var refreshTokenHash = Convert.ToHexString(RandomNumberGenerator.GetBytes(16));
                    user.RefreshTokenHash = refreshTokenHash;
                    user = await userRepository.UpdateAsync(user);

                    var refreshToken = jwtTokenUtils.GenerateRefreshToken(email, user.RefreshTokenHash);
                    var refreshExpiresAt = DateTime.Now.AddMinutes(jwtOptions.Value.RefreshTokenExpiryMinutes);

                    CookieOptions options = new CookieOptions()
                    {
                        Expires = refreshExpiresAt,
                        HttpOnly = true,
                        Secure = true,
                    };

                    httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken, options);

                    var AccesstokenResponse = jwtTokenUtils.GenerateAccessToken(user.Email);

                    return new LoginResponse(
                        user,
                        AccesstokenResponse
                    );
                });
            Field<UserType>("Authorize").
                ResolveAsync(async context =>
                {
                    var email = context.User?.FindFirst(ClaimTypes.Email)?.Value;

                    if (email == null)
                    {
                        context.Errors.Add(new ExecutionError("Token is not valid")
                        {
                            Code = ExceptionsCode.INVALID_TOKEN.ToString(),
                        });
                        return null;
                    }

                    var user = await userRepository.GetUserByEmailAsync(email);

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
            Field<TokenResponseType>("RefreshToken").
                ResolveAsync(async context =>
                {
                    try
                    {
                        httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("refreshToken", out string? refreshTokenCookie);
                        var tokenHandler = new JwtSecurityTokenHandler();
                        ClaimsPrincipal principal = tokenHandler.ValidateToken(refreshTokenCookie, new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = jwtOptions.Value.Issuer,
                            ValidateAudience = true,
                            ValidAudience = jwtOptions.Value.Audience,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Value.Secret)),
                            ValidateIssuerSigningKey = true,
                            ValidateLifetime = true,
                        }, out SecurityToken validatedToken);

                        var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                        var user = await userRepository.GetUserByEmailAsync(email);

                        var hash = principal.FindFirst("hash")?.Value;

                        if (user.RefreshTokenHash != hash)
                        {
                            throw new Exception();
                        }

                        var refreshTokenHash = Convert.ToHexString(RandomNumberGenerator.GetBytes(16));
                        user.RefreshTokenHash = refreshTokenHash;
                        user = await userRepository.UpdateAsync(user);

                        var refreshToken = jwtTokenUtils.GenerateRefreshToken(email, user.RefreshTokenHash);
                        var refreshExpiresAt = DateTime.Now.AddMinutes(jwtOptions.Value.RefreshTokenExpiryMinutes);

                        CookieOptions options = new CookieOptions()
                        {
                            Expires = refreshExpiresAt,
                            HttpOnly = true,
                            Secure = true,
                        };

                        httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken, options);

                        var AccesstokenResponse = jwtTokenUtils.GenerateAccessToken(user.Email);
                        return AccesstokenResponse;
                    }
                    catch
                    {
                        context.Errors.Add(new ExecutionError("")
                        {
                            Code = "401",
                        });
                    }
                    return null;
                });
        }
    }
}
