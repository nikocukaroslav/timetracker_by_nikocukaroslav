using GraphQL.Types;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;
using timetracker.Server.Application.Services;

namespace timetracker.Server.API.WorkDay.Types
{
    public class CreateWorkDaysResponseType : ObjectGraphType<WorkDayModel>
    {
        public CreateWorkDaysResponseType()
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
