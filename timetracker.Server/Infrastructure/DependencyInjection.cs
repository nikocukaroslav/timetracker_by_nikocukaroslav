using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;
using timetracker.Server.Infrastructure.Repositories;

namespace timetracker.Server.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            ConfigurationManager configuration)
        {

            services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();

            services.AddScoped<IUserRepository, UserRepository>();

            services.AddAuth(configuration);

            return services;
        }

        public static IServiceCollection AddAuth(
            this IServiceCollection services,
            ConfigurationManager configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = configuration["JWT:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = configuration["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"])),
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Permissions.MANAGE_USERS.ToString(), policy => policy
                    .RequireAssertion(async context =>
                    {
                        var email = context.User.FindFirst("email")?.Value;

                        if (email == null)
                        {
                            return false;
                        }

                        var userRepository = services.BuildServiceProvider().GetRequiredService<IUserRepository>();
                        var permissions = await userRepository.GetPermissionsByEmailAsync(email);

                        return permissions.Contains(Permissions.MANAGE_USERS.ToString());
                    })
                );
            });

            return services;
        }
    }
}
