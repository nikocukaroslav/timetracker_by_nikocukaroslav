using App.GraphQL.Scheme;
using Microsoft.AspNetCore.Authentication.Cookies;
using timetracker.Server.Database;
using timetracker.Server.Domain.Repositories;
using timetracker.Server.GraphQL;
using timetracker.Server.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddGraphQLDI();

//Authentication
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();

//Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("GET_TASKS", policy => policy
        .RequireAssertion(context => true)
    );
});

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
