using App.API.Scheme;
using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Mutations;
using timetracker.Server.API.Queries;
using timetracker.Server.API.Types;
using timetracker.Server.API.Types.DTO;

namespace timetracker.Server.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddGraphQLDI(this IServiceCollection services)
        {
            services.AddTransient<APIScheme>();

            services.AddTransient<RootQuery>();
            services.AddTransient<RootMutation>();

            services.AddTransient<UserType>();
            services.AddTransient<LoginResponseType>();
            services.AddTransient<UsersResponseType>();
            services.AddTransient<UserInputType>();

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
