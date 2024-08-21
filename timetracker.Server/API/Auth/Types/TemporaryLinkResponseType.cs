using GraphQL.Types;
using timetracker.Server.Domain.Entities;

namespace timetracker.Server.API.Auth.Types
{
    public class TemporaryLinkResponseType : ObjectGraphType<TemporaryLink>
    {
        public TemporaryLinkResponseType()
        {
            Field(t => t.ExpiresAt);
            Field(t => t.UserId);
        }
    }
}
