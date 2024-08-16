using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class CreateSessionRequestType : InputObjectGraphType
    {
        public CreateSessionRequestType()
        {
            Field<NonNullGraphType<GuidGraphType>>("userId");
            Field<NonNullGraphType<LongGraphType>>("startTime");
            Field<NonNullGraphType<LongGraphType>>("endTime");
        }
    }
}
