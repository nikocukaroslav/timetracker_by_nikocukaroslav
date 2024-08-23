using GraphQL;
using GraphQL.Types;
using timetracker.Server.Application.Services;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.Auth
{
    public class AuthQuery : ObjectGraphType
    {
        public AuthQuery(ITemporaryLinkRepository temporaryLinkRepository)
        {
            Field<BooleanGraphType>("temporaryLinkValidity")
                .Arguments(
                new QueryArguments(
                    new QueryArgument<GuidGraphType> { Name = "id" }
                ))
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("id");

                    var temporaryLink = await temporaryLinkRepository.GetByIdAsync(id);

                    if (temporaryLink == null)
                    {
                        context.Errors.Add(ErrorCode.LINK_NOT_FOUND);
                        return null;
                    }

                    if (!DataValidator.IsTimeInFuture(temporaryLink.ExpiresAt))
                    {
                        context.Errors.Add(ErrorCode.LINK_EXPIRED);
                        return null;
                    }

                    return true;
                });
        }
    }
}
