using GraphQL.Types;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;

namespace timetracker.Server.API.WorkSession.Types
{
    public class CreateSessionResponseType : ObjectGraphType<WorkSessionModel>
    {
        public CreateSessionResponseType()
        {
            Field(t => t.Id);
            Field(t => t.StartTime);
            Field(t => t.EndTime, true);
            Field(t => t.SetBy);
            Field(t => t.EditedAt, true);
            Field(t => t.EditorId, true);
        }
    }
}
