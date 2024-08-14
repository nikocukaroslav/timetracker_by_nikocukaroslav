using GraphQL.Types;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;

namespace timetracker.Server.API.WorkDay.Types
{
    public class AddWorkDayResponseType : ObjectGraphType<WorkDayModel>
    {
        public AddWorkDayResponseType()
        {
            Field(t => t.Id);
            Field(t => t.Day);
            Field(t => t.StartTime);
            Field(t => t.EndTime);
        }
    }
}
