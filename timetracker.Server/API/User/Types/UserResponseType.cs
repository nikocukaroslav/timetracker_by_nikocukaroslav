using GraphQL;
using GraphQL.Types;
using timetracker.Server.Domain.Enums;
using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.User.Types
{
    public class UserResponseType : ObjectGraphType<UserModel>
    {
        public UserResponseType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.Position);
            Field(t => t.Timeload)
                .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString());
            Field<ListGraphType<StringGraphType>>("permissions")
                .AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString())
                .Resolve(context => context.Source.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}
