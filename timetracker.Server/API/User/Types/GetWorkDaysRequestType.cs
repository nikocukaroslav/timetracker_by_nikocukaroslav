using GraphQL.Types;

namespace timetracker.Server.API.User.Types
{
    public class GetWorkDaysRequestType : InputObjectGraphType
    {
        public GetWorkDaysRequestType()
        {
            Field<NonNullGraphType<DateOnlyGraphType>>("startDate");
            Field<NonNullGraphType<DateOnlyGraphType>>("endDate");
            Field<NonNullGraphType<GuidGraphType>>("userId");
        }
    }
}
