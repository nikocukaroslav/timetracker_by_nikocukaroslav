using GraphQL.DataLoader;
using GraphQL.Types;
using timetracker.Server.API.Role.Types;
using timetracker.Server.Infrastructure.Interfaces;
using UserModel = timetracker.Server.Domain.Entities.User;
using RoleModel = timetracker.Server.Domain.Entities.Role;

namespace timetracker.Server.API.Auth.Types
{
    public class LoginUserResponseType : ObjectGraphType<UserModel>
    {
        public LoginUserResponseType(IRoleRepository roleRepository, IDataLoaderContextAccessor accessor) 
        {
            Field(t => t.Id);
            Field(t => t.Name);

            Field<UserRoleResponseType, RoleModel>("role")
            .ResolveAsync(context =>
            {
                var loader = accessor.Context.GetOrAddBatchLoader<Guid?, RoleModel>("GetRolesByIdAsync", roleRepository.GetRolesByIdAsync);

                    return loader.LoadAsync(context.Source.RoleId);
                });

            Field<ListGraphType<StringGraphType>>("permissions")
                 .Resolve(context => context.Source.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}
