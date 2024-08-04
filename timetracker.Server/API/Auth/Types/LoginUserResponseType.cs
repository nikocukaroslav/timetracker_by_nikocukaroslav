using GraphQL.Types;
using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.Auth.Types
{
    public class LoginUserResponseType : ObjectGraphType<UserModel>
    {
        public LoginUserResponseType() 
        {
            Field(t => t.Name);
            Field(t => t.Position);
            Field<ListGraphType<StringGraphType>>("permissions")
                 .Resolve(context => context.Source.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}
