using GraphQL;
using GraphQL.Types;
using timetracker.Server.Domain.Repositories;
using timetracker.Server.GraphQL.Types;

namespace timetracker.Server.GraphQL.Queries
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery(IUserRepository userRepository)
        {
            Field<StringGraphType>("Permissions")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context => await userRepository.GetPermissionsAsync(context.GetArgument<Guid>("id")));

            Field<UserType>("User")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context => await userRepository.GetByIdAsync(context.GetArgument<Guid>("id")));
        }
    }
}
