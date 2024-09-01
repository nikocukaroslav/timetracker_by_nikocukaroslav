using GraphQL.Types;
using RoleModel = timetracker.Server.Domain.Entities.Role;

namespace timetracker.Server.API.Role.Types
{
    public class RoleResponseType : ObjectGraphType<RoleModel>
    {
        public RoleResponseType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field<ListGraphType<StringGraphType>>("defaultPermissions")
              .Resolve(context => context.Source.DefaultPermissions?.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}
