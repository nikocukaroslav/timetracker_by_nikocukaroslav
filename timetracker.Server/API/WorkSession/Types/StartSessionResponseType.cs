using GraphQL.Types;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;

namespace timetracker.Server.API.WorkSession.Types
{
    public class StartSessionResponseType : ObjectGraphType<WorkSessionModel>
    {
        public StartSessionResponseType()
        {
            Field(t => t.Id);
            Field(t => t.StartTime);
        }
    }
}
