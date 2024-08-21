using GraphQL.Types;
using timetracker.Server.API.Auth;
using timetracker.Server.API.User;
using timetracker.Server.API.WorkDay;
using timetracker.Server.API.WorkSession;

namespace timetracker.Server.API
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<UserQuery>("users").Resolve(_ => new { });
            Field<AuthQuery>("authQuery").Resolve(_ => new { });
            Field<WorkSessionQuery>("workSessions").Resolve(_ => new { });
            Field<WorkDayQuery>("workDays").Resolve(_ => new { });
        }
    }
}
