using GraphQL.Types;
using timetracker.Server.API.Auth.Models;

namespace timetracker.Server.API.Auth.Types
{
    public class AuthorizeResponseType : ObjectGraphType<AuthorizeResponse>
    {
        public AuthorizeResponseType()
        {
            Field<LoginUserResponseType>("user").Resolve(context => context.Source.User);
            Field<TokenResponseType>("accessToken").Resolve(context => context.Source.AccessToken);
        }
    }
}
