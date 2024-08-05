using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;
using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class StopSessionResponseType : ObjectGraphType<WorkSessionModel>
    {
        public StopSessionResponseType()
        {
            Field(t => t.Id);
            Field(t => t.StartTime);
            Field(t => t.EndTime, true);
            Field(t => t.SetBy);
        }
    }
}
