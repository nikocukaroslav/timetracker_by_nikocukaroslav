using GraphQL.Types;
using timetracker.Server.API.Auth;
using timetracker.Server.API.User;

namespace timetracker.Server.API
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<UserMutation>("users").Resolve(_ => new { });
            Field<AuthMutation>("auth").Resolve(_ => new { });
        }
    }
}
