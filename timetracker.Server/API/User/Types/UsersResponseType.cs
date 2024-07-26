using GraphQL;
using GraphQL.Types;
using UserModel = timetracker.Server.Domain.Entities.User;
using timetracker.Server.Domain.Enums;

namespace timetracker.Server.API.User.Types
{
    public class UsersResponseType : ObjectGraphType<UserModel>
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
