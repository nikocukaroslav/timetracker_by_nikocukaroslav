using GraphQL.Types;

namespace timetracker.Server.API.WorkDay.Types
{
    public class EditWorkDayRequestType : InputObjectGraphType
    {
        public EditWorkDayRequestType() 
        {
            Field<NonNullGraphType<GuidGraphType>>("id");
            Field<NonNullGraphType<DateOnlyGraphType>>("day");
            Field<NonNullGraphType<LongGraphType>>("startTime");
            Field<NonNullGraphType<LongGraphType>>("endTime");
        }
    }
}
