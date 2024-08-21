using GraphQL.Types;

namespace timetracker.Server.API.User.Types
{
    public class CreatePasswordRequestType : InputObjectGraphType
    {
        public CreatePasswordRequestType()
        {
            Field<NonNullGraphType<GuidGraphType>>("userId");
            Field<NonNullGraphType<StringGraphType>>("password");
        }
    }
}
