using App.API.Scheme;
using Microsoft.AspNetCore.Authentication.Cookies;
using timetracker.Server.API;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Authentication;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Repositories.Interfaces;
using timetracker.Server.Infrastructure.Repositories.ModelRepositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();

builder.Services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.Configure<PasswordHasherSettings>(builder.Configuration.GetSection("PasswordHasher"));
builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();

//Authentication
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();

//Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Permissions.MANAGE_USERS.ToString(), policy => policy
        .RequireAssertion(async context =>
        {
            var idClaim = context.User.FindFirst("id");

            if (idClaim == null || !Guid.TryParse(idClaim.Value, out Guid userId))
            {
                // якщо не вдалос€ знайти id або перетворити в Guid, в≥дмовл€Їмо в доступ≥
                return false;
            }

            // ќтримуЇмо серв≥с з HttpContext
            var userRepository = builder.Services.BuildServiceProvider().GetRequiredService<IUserRepository>();

            // ¬икористовуЇмо userRepository дл€ отриманн€ дозвол≥в користувача
            var permissions = await userRepository.GetPermissionsAsync(userId);

            // ѕерев≥р€Їмо на€вн≥сть потр≥бного дозволу
            return permissions.Contains(Permissions.MANAGE_USERS.ToString());
        })
    );
});

builder.Services.AddGraphQLDI();

var app = builder.Build();

app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin());

app.UseAuthentication();
app.UseAuthorization();

app.UseGraphQL<APIScheme>();
app.UseGraphQLAltair();

app.MapControllers();

app.Run();
