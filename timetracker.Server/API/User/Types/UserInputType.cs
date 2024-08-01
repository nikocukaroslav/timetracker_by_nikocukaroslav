using GraphQL.Types;

namespace timetracker.Server.API.User.Types
{
    public class UserInputType : InputObjectGraphType
    {
        public UserInputType()
        {
            Field<StringGraphType>("name");
            Field<StringGraphType>("surname");
            Field<StringGraphType>("email");
            Field<StringGraphType>("password");
            Field<StringGraphType>("employmentType");
            Field<ListGraphType<StringGraphType>>("permissions");
        }
    }
}
