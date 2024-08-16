using GraphQL.Types;

namespace timetracker.Server.API.WorkDay.Types
{
    public class UpdateWorkDayRequestType : InputObjectGraphType
    {
        public UpdateWorkDayRequestType() 
        {
            Field<NonNullGraphType<GuidGraphType>>("id");
            Field<NonNullGraphType<DateOnlyGraphType>>("day");
            Field<NonNullGraphType<TimeOnlyGraphType>>("startTime");
            Field<NonNullGraphType<TimeOnlyGraphType>>("endTime");
        }
    }
}
