using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Auth;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.API.User;
using timetracker.Server.API.User.Types;

namespace timetracker.Server.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddGraphQLDI(this IServiceCollection services)
        {
            services.AddTransient<APIScheme>();

            services.AddTransient<RootQuery>();
            services.AddTransient<RootMutation>();

            //Users
            services.AddTransient<UserQuery>();
            services.AddTransient<UserMutation>();
            services.AddTransient<UserType>();
            services.AddTransient<UserInputType>();
            services.AddTransient<UsersResponseType>();

            //Auth
            services.AddTransient<AuthQuery>();
            services.AddTransient<LoginResponseType>();
            services.AddTransient<LoginUserResponseType>();

            services.AddGraphQL(options => options
                .AddAutoSchema<ISchema>()
                .AddSystemTextJson()
                // .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
                .AddAuthorizationRule()
                .AddDataLoader());

            return services;
        }
    }
}
