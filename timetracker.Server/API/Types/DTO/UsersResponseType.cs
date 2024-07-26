using GraphQL;
using GraphQL.Types;
using timetracker.Server.Domain.Entities;

namespace timetracker.Server.API.Types.DTO
{
    public class UsersResponseType : ObjectGraphType<Users>
    {
        public UsersResponseType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.EmployeeType);
            Field<ListGraphType<StringGraphType>>("permissions")
                .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString())
                .Resolve(context => context.Source.Permissions.Split(',').ToList());
        }
    }
}
