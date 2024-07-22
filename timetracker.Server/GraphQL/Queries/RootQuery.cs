using GraphQL;
using GraphQL.Types;
using timetracker.Server.Domain.Repositories;

namespace timetracker.Server.GraphQL.Queries
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery(IUserRepository userRepository)
        {
            Field<StringGraphType>("Permissions")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context => await userRepository.GetPermissions(context.GetArgument<Guid>("id")));
        }
    }
}
