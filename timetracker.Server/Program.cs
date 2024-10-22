using GraphQL;
using Hangfire;
using timetracker.Server.API;
using timetracker.Server.Application;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddHangfire((provider, config) =>
{
    var connectionString = provider.GetRequiredService<IConfiguration>()
    .GetConnectionString("HangfireDbConnection");

    config.UseSqlServerStorage(connectionString);
});
builder.Services.AddHangfireServer();

builder.Services.AddApplication(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddGraphQL(options => options
    .AddSchema<APIScheme>()
    .AddSystemTextJson()
    .AddValidationRule<AuthorizationRule>()
    .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
    .AddGraphTypes(typeof(APIScheme).Assembly)
    .AddDataLoader());

var app = builder.Build();

app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseCors(builder => builder
    .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();

app.UseGraphQL<APIScheme>();
app.UseGraphQLAltair();

app.UseHangfireDashboard();

app.MapControllers();

var planner = app.Services.GetRequiredService<IPlanner>();
planner?.ScheduleRecurringJob();

app.Run();