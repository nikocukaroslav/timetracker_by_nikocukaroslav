using GraphQL.Types;

namespace timetracker.Server.API.User.Types
{
    public class FilterUsersRequestType : InputObjectGraphType
    {
        public FilterUsersRequestType() 
        {
            Field<BooleanGraphType>("isEmployed");
            Field<StringGraphType>("status");
            Field<StringGraphType>("position");
        }
    }
}
