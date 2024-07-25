using GraphQL;
using GraphQL.Types;
using timetracker.Server.Domain.Exceptions;
using timetracker.Server.API.Types;
using timetracker.Server.Infrastructure.Repositories.Interfaces;

namespace timetracker.Server.API.Queries
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery(IUserRepository userRepository)
        {
            Field<StringGraphType>("Permissions")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var permissions = await userRepository.GetPermissionsAsync(context.GetArgument<Guid>("id"));

                   if (permissions == null)
                   {
                       context.Errors.Add(new ExecutionError("Invalid id")
                       {
                           Code = ExceptionsCode.INVALID_ID.ToString(),
                       });
                       return null;
                   }

                   return permissions;
               });

            Field<UserType>("User")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var user = await userRepository.GetByIdAsync(context.GetArgument<Guid>("id"));

                   if (user == null)
                   {
                       context.Errors.Add(new ExecutionError("Invalid id")
                       {
                           Code = ExceptionsCode.INVALID_ID.ToString(),
                       });
                       return null;
                   }

                   return user;
               });
        }
    }
}
