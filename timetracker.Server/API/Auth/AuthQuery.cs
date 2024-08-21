using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Auth.Types;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Auth
{
    public class AuthQuery : ObjectGraphType
    {
        public AuthQuery(ITemporaryLinkRepository temporaryLinkRepository)
        {
            Field<TemporaryLinkResponseType>("temporaryLink")
                .Arguments(
                new QueryArguments(
                    new QueryArgument<GuidGraphType> { Name = "id" }
                ))
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("id");

                    var temporaryLink = await temporaryLinkRepository.GetByIdAsync(id);

                    return temporaryLink;
                });
        }
    }
}
