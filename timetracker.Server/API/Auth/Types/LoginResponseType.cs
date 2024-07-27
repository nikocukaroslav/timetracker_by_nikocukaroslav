using GraphQL.Types;
using timetracker.Server.API.Auth.Models;

namespace timetracker.Server.API.Auth.Types
{
    public class LoginResponseType : ObjectGraphType<LoginResponse>
    {
        public LoginResponseType()
        {
            Field<LoginUserResponseType>("user").Resolve(context => context.Source.User);
            Field(t => t.Token);
        }
    }
}
