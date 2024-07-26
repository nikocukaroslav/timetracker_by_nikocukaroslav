using GraphQL.Types;
using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.Auth.Types
{
    public class LoginUserType : ObjectGraphType<UserModel>
    {
        public LoginUserType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.EmployeeType);
            Field(t => t.Permissions);
        }
    }
}
