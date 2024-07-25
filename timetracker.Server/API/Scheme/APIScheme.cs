using GraphQL.Types;
using timetracker.Server.API.Mutations;
using timetracker.Server.API.Queries;

namespace App.API.Scheme
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
