using GraphQL.Types;

namespace timetracker.Server.API.User.Types
{
    public class CreateUserRequestType : InputObjectGraphType
    {
        public CreateUserRequestType()
        {
            Field<StringGraphType>("name");
            Field<StringGraphType>("surname");
            Field<StringGraphType>("email");
            Field<StringGraphType>("password");
            Field<TimeOnlyGraphType>("timeload");
            Field<StringGraphType>("position");
            Field<ListGraphType<StringGraphType>>("permissions");
        }
    }
}
