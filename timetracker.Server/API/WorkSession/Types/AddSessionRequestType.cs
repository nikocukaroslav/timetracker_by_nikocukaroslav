using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class AddSessionRequestType : InputObjectGraphType
    {
        public AddSessionRequestType()
        {
            Field<NonNullGraphType<GuidGraphType>>("userId");
            Field<NonNullGraphType<LongGraphType>>("startTime");
            Field<NonNullGraphType<LongGraphType>>("endTime");
        }
    }
}
