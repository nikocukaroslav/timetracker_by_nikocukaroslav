using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Role.Models;
using timetracker.Server.API.Role.Types;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;
using RoleModel = timetracker.Server.Domain.Entities.Role;

namespace timetracker.Server.API.Role
{
    public class RoleMutation : ObjectGraphType
    {
        public RoleMutation(IRoleRepository roleRepository)
        {
            this.AuthorizeWithPolicy(Permission.MANAGE_ROLES.ToString());
            Field<RoleResponseType>("createRole")
                .Arguments(new QueryArguments(new QueryArgument<CreateRoleRequestType> { Name = "role" }))
                .ResolveAsync(async context =>
                {
                    var inputRole = context.GetArgument<CreateRoleRequest>("role");

                    var roleToCreate = new RoleModel()
                    {
                        Name = inputRole.Name,
                        DefaultPermissions = string.Join(",", inputRole.DefaultPermissions ?? new List<string>())
                    };

                    return await roleRepository.CreateAsync(roleToCreate);
                });
            Field<RoleResponseType>("updateRole")
               .Arguments(new QueryArguments(new QueryArgument<UpdateRoleRequestType> { Name = "role" }))
               .ResolveAsync(async context =>
               {
                   var inputRole = context.GetArgument<UpdateRoleRequest>("role");

                   var role = await roleRepository.GetByIdAsync(inputRole.Id);

                   if (role == null)
                   {
                       context.Errors.Add(ErrorCode.ROLE_NOT_FOUND);
                       return null;
                   }

                   role.Name = inputRole.Name ?? role.Name;
                   if (inputRole.DefaultPermissions != null)
                   {
                       role.DefaultPermissions = string.Join(",", inputRole.DefaultPermissions);
                   }

                   return await roleRepository.UpdateAsync(role);
               });
            Field<BooleanGraphType>("deleteRole")
              .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
              .ResolveAsync(async context =>
              {
                  var id = context.GetArgument<Guid>("id");

                  var role = await roleRepository.GetByIdAsync(id);

                  if (role == null)
                  {
                      context.Errors.Add(ErrorCode.ROLE_NOT_FOUND);
                      return null;
                  }

                  await roleRepository.DeleteAsync(id);

                  return true;
              });
        }
    }
}
