using GraphQL.Types;

namespace timetracker.Server.API.User.Types
{
    public class FilterUsersRequestType : InputObjectGraphType
    {
        public FilterUsersRequestType() 
        {
            Field<BooleanGraphType>("isEmployed");
            Field<ListGraphType<StringGraphType>>("statusList");
            Field<ListGraphType<StringGraphType>>("positionList");
        }
    }
}
