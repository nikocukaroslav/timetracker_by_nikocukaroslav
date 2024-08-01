using GraphQL.Types;
using timetracker.Server.API.Auth.Models;

namespace timetracker.Server.API.Auth.Types
{
    public class RefreshTokenResponseType : ObjectGraphType<RefreshTokenResponse>
    {
        public RefreshTokenResponseType()
        {
            Field<TokenResponseType>("accessToken").Resolve(context => context.Source.AccessToken);
            Field<TokenResponseType>("refreshToken").Resolve(context => context.Source.RefreshToken);
        }
    }
}
