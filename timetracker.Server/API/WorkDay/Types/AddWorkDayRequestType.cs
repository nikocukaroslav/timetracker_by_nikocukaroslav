using GraphQL.Types;

namespace timetracker.Server.API.WorkDay.Types
{
    public class AddWorkDayRequestType : InputObjectGraphType
    {
       public AddWorkDayRequestType() 
        {
            Field<NonNullGraphType<DateTimeGraphType>>("day");
            Field<NonNullGraphType<LongGraphType>>("startTime");
            Field<NonNullGraphType<LongGraphType>>("endTime");
            Field<NonNullGraphType<GuidGraphType>>("userId");
        }
    }
}
