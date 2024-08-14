using GraphQL.Types;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;

namespace timetracker.Server.API.WorkDay.Types
{
    public class WorkDayResponseType : ObjectGraphType<WorkDayModel>
    {
        public WorkDayResponseType()
        {
            Field(t => t.Id);
            Field(t => t.Day);
            Field(t => t.StartTime);
            Field(t => t.EndTime);
            Field(t => t.UserId);
        }
    }
}
