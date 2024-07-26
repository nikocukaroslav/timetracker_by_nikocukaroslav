using GraphQL.Types;
using timetracker.Server.API.Auth;
using timetracker.Server.API.User;

namespace timetracker.Server.API
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<UserQuery>("users").Resolve(_ => new { });
            Field<AuthQuery>("auth").Resolve(_ => new { });
        }
    }
}
