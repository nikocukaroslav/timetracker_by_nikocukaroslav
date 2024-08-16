using GraphQL.Types;
using timetracker.Server.API.User;
using timetracker.Server.API.WorkDay;
using timetracker.Server.API.WorkSession;

namespace timetracker.Server.API
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<UserQuery>("user").Resolve(_ => new { });
            Field<WorkSessionQuery>("workSession").Resolve(_ => new { });
            Field<WorkDayQuery>("workDay").Resolve(_ => new { });
        }
    }
}
