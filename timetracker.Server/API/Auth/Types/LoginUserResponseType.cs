using GraphQL.Types;
using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.Auth.Types
{
    public class LoginUserResponseType : ObjectGraphType<UserModel>
    {
        public LoginUserResponseType() 
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.EmployeeType);
            Field<ListGraphType<StringGraphType>>("permissions")
                 .Resolve(context => context.Source.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}
