using GraphQL.Types;
using RoleModel = timetracker.Server.Domain.Entities.Role;

namespace timetracker.Server.API.Role.Types
{
    public class UserRoleResponseType : ObjectGraphType<RoleModel>
    {
        public UserRoleResponseType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
        }
    }
}

