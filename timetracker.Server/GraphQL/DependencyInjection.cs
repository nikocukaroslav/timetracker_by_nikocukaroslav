using App.GraphQL.Scheme;
using GraphQL;
using GraphQL.Types;
using timetracker.Server.GraphQL.Mutations;
using timetracker.Server.GraphQL.Queries;
using timetracker.Server.GraphQL.Types;

namespace timetracker.Server.GraphQL
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddGraphQLDI(this IServiceCollection services)
        {
            services.AddTransient<APIScheme>();

            services.AddTransient<RootQuery>();
            services.AddTransient<RootMutation>();

            services.AddTransient<UserType>();
            services.AddTransient<UserInputType>();

            services.AddGraphQL(options => options
                .AddAutoSchema<ISchema>()
                .AddSystemTextJson()
                .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
                .AddAuthorizationRule()
                .AddDataLoader());

            return services;
        }
    }
}
