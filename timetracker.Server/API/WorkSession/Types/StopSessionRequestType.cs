using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class StopSessionRequestType : InputObjectGraphType
    {
        public StopSessionRequestType()
        {
            Field<NonNullGraphType<GuidGraphType>>("id");
            Field<NonNullGraphType<LongGraphType>>("endTime");
        }
    }
}
