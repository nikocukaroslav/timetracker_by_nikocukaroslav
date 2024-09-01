using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Role.Types;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Role
{
    public class RoleQuery : ObjectGraphType
    {
        public RoleQuery(IRoleRepository roleRepository)
        {
            Field<ListGraphType<RoleResponseType>>("roles")
                .Authorize()
                .ResolveAsync(async context =>
                {
                    return await roleRepository.GetAllAsync();
                });
        }
    }
}
