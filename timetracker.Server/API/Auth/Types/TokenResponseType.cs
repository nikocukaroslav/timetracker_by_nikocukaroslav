using GraphQL.Types;
using timetracker.Server.API.Auth.Models;

namespace timetracker.Server.API.Auth.Types
{
    public class TokenResponseType : ObjectGraphType<TokenResponse>
    {
        public TokenResponseType() {
            Field(t => t.Token);
            Field(t => t.ExpiresAt);
        }
    }
}
