using GraphQL.Types;

namespace timetracker.Server.API.Types
{
    public class UserInputType : InputObjectGraphType
    {
        public UserInputType()
        {
            Field<GuidGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("surname");
            Field<StringGraphType>("email");
            Field<StringGraphType>("password");
            Field<StringGraphType>("employeeType");
            Field<StringGraphType>("permissions");
        }
    }
}
