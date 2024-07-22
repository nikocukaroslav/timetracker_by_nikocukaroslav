using GraphQL.Types;
using timetracker.Server.GraphQL.Mutations;
using timetracker.Server.GraphQL.Queries;

namespace App.GraphQL.Scheme
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
