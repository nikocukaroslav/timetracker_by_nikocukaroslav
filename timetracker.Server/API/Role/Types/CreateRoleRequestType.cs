using GraphQL.Types;

namespace timetracker.Server.API.Role.Types
{
    public class CreateRoleRequestType : InputObjectGraphType
    {
        public CreateRoleRequestType()
        {
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<ListGraphType<StringGraphType>>("defaultPermissions");
        }
    }
}
