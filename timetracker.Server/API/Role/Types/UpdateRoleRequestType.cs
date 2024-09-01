using GraphQL.Types;

namespace timetracker.Server.API.Role.Types
{
    public class UpdateRoleRequestType : InputObjectGraphType
    {
        public UpdateRoleRequestType()
        {
            Field<NonNullGraphType<GuidGraphType>>("id");
            Field<StringGraphType>("name");
            Field<ListGraphType<StringGraphType>>("defaultPermissions");
        }
    }
}
