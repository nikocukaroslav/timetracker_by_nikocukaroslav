using GraphQL.Types;
using timetracker.Server.API.Auth.DTO;

namespace timetracker.Server.API.Auth.Types
{
    public class LoginResponseType : ObjectGraphType<LoginResponse>
    {
        public LoginResponseType()
        {
            Field(t => t.User);
            Field(t => t.Token);
        }
    }
}
