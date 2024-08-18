using GraphQL.Types;

namespace timetracker.Server.API.User.Types
{
    public class CreateUserRequestType : InputObjectGraphType
    {
        public CreateUserRequestType()
        {
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<StringGraphType>>("surname");
            Field<NonNullGraphType<StringGraphType>>("email");
            Field<NonNullGraphType<TimeOnlyGraphType>>("timeload");
            Field<NonNullGraphType<StringGraphType>>("position");
            Field<ListGraphType<StringGraphType>>("permissions");
        }
    }
}
