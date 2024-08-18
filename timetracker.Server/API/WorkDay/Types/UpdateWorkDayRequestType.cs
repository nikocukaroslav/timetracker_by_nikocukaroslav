using GraphQL.Types;

namespace timetracker.Server.API.WorkDay.Types
{
    public class UpdateWorkDayRequestType : InputObjectGraphType
    {
        public UpdateWorkDayRequestType() 
        {
            Field<NonNullGraphType<GuidGraphType>>("id");
            Field<DateOnlyGraphType>("day");
            Field<TimeOnlyGraphType>("startTime");
            Field<TimeOnlyGraphType>("endTime");
        }
    }
}
