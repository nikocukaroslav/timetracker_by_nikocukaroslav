using GraphQL.Types;
using timetracker.Server.Application.Services;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;

namespace timetracker.Server.API.WorkDay.Types
{
    public class WorkDayResponseType : ObjectGraphType<WorkDayModel>
    {
        public WorkDayResponseType()
        {
            Field(t => t.Id);
            Field<DateOnlyGraphType>("day")
               .Resolve(context => DateTimeFormatter.DateTimeToDateOnly(context.Source.Day));
            Field<TimeOnlyGraphType>("startTime")
              .Resolve(context => DateTimeFormatter.TimeSpanToTimeOnly(context.Source.StartTime));
            Field<TimeOnlyGraphType>("endTime")
               .Resolve(context => DateTimeFormatter.TimeSpanToTimeOnly(context.Source.EndTime));
        }
    }
}
