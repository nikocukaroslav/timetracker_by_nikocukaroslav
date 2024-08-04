using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class StopSessionRequestType : InputObjectGraphType
    {
        public StopSessionRequestType()
        {
            Field<GuidGraphType>("id");
            Field<LongGraphType>("endTime");
        }
    }
}
