using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Role.Types;
using timetracker.Server.Application.Services;
using timetracker.Server.Domain.Enums;
using UserModel = timetracker.Server.Domain.Entities.User;
using RoleModel = timetracker.Server.Domain.Entities.Role;
using GraphQL.DataLoader;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.User.Types
{
    public class UserResponseType : ObjectGraphType<UserModel>
    {
        public UserResponseType(IRoleRepository roleRepository, IDataLoaderContextAccessor accessor)
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.Status, true);

            Field<UserRoleResponseType, RoleModel>("role")
                .ResolveAsync(context =>
                {
                    var loader = accessor.Context.GetOrAddBatchLoader<Guid?, RoleModel>("GetRolesByIdAsync", roleRepository.GetRolesByIdAsync);

                    return loader.LoadAsync(context.Source.RoleId);
                });

            Field(t => t.IsEmployed)
                .AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString());

            Field<TimeOnlyGraphType>("timeload")
                .AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString())
                .Resolve(context => DateTimeFormatter.TimeSpanToTimeOnly(context.Source.Timeload));

            Field<ListGraphType<StringGraphType>>("permissions")
                .AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString())
                .Resolve(context => context.Source.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}
