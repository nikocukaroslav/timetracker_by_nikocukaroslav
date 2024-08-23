using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.WorkSession
{
    public class WorkSessionQuery : ObjectGraphType
    {
        public WorkSessionQuery(IWorkSessionRepository workSessionRepository)
        {
            this.Authorize();

            Field<WorkSessionResponseType>("workSession")
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    var workSession = await workSessionRepository.GetByIdAsync(context.GetArgument<Guid>("id"));

                    if (workSession == null)
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                        return null;
                    }

                    return workSession;
                });

        }
    }
}
