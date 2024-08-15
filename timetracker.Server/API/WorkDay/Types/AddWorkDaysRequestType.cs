using GraphQL.Types;

namespace timetracker.Server.API.WorkDay.Types
{
    public class AddWorkDaysRequestType : InputObjectGraphType
    {
       public AddWorkDaysRequestType() 
        {
            Field<NonNullGraphType<ListGraphType<DateOnlyGraphType>>>("days");
            Field<NonNullGraphType<TimeOnlyGraphType>>("startTime");
            Field<NonNullGraphType<TimeOnlyGraphType>>("endTime");
            Field<NonNullGraphType<GuidGraphType>>("userId");
        }
    }
}
