using GraphQL.Types;

namespace timetracker.Server.API.WorkDay.Types
{
    public class AddWorkDaysRequestType : InputObjectGraphType
    {
       public AddWorkDaysRequestType() 
        {
            Field<NonNullGraphType<ListGraphType<DateOnlyGraphType>>>("days");
            Field<NonNullGraphType<LongGraphType>>("startTime");
            Field<NonNullGraphType<LongGraphType>>("endTime");
            Field<NonNullGraphType<GuidGraphType>>("userId");
        }
    }
}
