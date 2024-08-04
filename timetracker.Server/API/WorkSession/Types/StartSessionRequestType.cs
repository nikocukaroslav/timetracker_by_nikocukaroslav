using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class StartSessionRequestType : InputObjectGraphType
    {
        public StartSessionRequestType()
        {
            Field<GuidGraphType>("userId");
            Field<LongGraphType>("startTime");
        }
    }
}
