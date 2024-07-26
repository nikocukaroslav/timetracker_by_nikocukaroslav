using GraphQL.Types;
using timetracker.Server.API.User;

namespace timetracker.Server.API
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<UserMutation>("users").Resolve(_ => new { });

        }
    }
}
