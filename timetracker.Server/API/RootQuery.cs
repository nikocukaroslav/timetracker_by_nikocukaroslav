using GraphQL.Types;
using timetracker.Server.API.User;

namespace timetracker.Server.API
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<UserQuery>("users").Resolve(_ => new { });
        }
    }
}
