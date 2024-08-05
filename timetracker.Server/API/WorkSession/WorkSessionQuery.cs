using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;


namespace timetracker.Server.API.WorkSession
{
    public class WorkSessionQuery : ObjectGraphType
    {
        public WorkSessionQuery(IRepository<WorkSessionModel> workSessionRepository)
        {
            Field<WorkSessionResponseType>("GetWorkSession")
                .Authorize()
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
