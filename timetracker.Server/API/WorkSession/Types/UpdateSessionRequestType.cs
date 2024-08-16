using GraphQL.Types;

namespace timetracker.Server.API.WorkSession.Types
{
    public class UpdateSessionRequestType : InputObjectGraphType
    {
        public UpdateSessionRequestType()
        {
            Field<NonNullGraphType<GuidGraphType>>("id");
            Field<NonNullGraphType<LongGraphType>>("startTime");
            Field<NonNullGraphType<LongGraphType>>("endTime");
            Field<NonNullGraphType<LongGraphType>>("editedAt");
            Field<NonNullGraphType<GuidGraphType>>("editorId");
        }
    }
}
