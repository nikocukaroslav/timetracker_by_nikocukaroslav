using GraphQL.Types;

namespace timetracker.Server.API
{
    public class APIScheme : Schema
    {
        public APIScheme(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<RootQuery>();
            Mutation = serviceProvider.GetRequiredService<RootMutation>();
        }
    }
}
