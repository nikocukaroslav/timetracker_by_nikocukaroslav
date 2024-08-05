using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class StartSessionRequestType : InputObjectGraphType
    {
        public StartSessionRequestType()
        {
            Field<NonNullGraphType<GuidGraphType>>("userId");
            Field<NonNullGraphType<LongGraphType>>("startTime");
        }
    }
}
