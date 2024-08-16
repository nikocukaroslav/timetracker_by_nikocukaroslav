using GraphQL.Types;

namespace timetracker.Server.API.WorkDay.Types
{
    public class CreateWorkDaysRequestType : InputObjectGraphType
    {
       public CreateWorkDaysRequestType() 
        {
            Field<NonNullGraphType<ListGraphType<DateOnlyGraphType>>>("days");
            Field<NonNullGraphType<TimeOnlyGraphType>>("startTime");
            Field<NonNullGraphType<TimeOnlyGraphType>>("endTime");
            Field<NonNullGraphType<GuidGraphType>>("userId");
        }
    }
}
