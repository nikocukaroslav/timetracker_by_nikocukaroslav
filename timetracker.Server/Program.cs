using App.API.Scheme;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using timetracker.Server.API;
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
    options.AddPolicy("ADD_USER", policy => policy
        .RequireAssertion(context => false)
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
