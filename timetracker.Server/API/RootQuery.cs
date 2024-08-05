using GraphQL.Types;
using timetracker.Server.API.User;
using timetracker.Server.API.WorkSession;

namespace timetracker.Server.API
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<UserQuery>("users").Resolve(_ => new { });
            Field<WorkSessionQuery>("workSessions").Resolve(_ => new { });
        }
    }
}
