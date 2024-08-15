using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Errors;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.WorkSession
{
    public class WorkSessionQuery : ObjectGraphType
    {
        public WorkSessionQuery(IWorkSessionRepository workSessionRepository)
        {
            this.Authorize();

            Field<WorkSessionResponseType>("GetWorkSession")
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    var workSession = await workSessionRepository
                    .GetByIdAsync(context.GetArgument<Guid>("id"));

                    if (workSession == null)
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                        return null;
                    }

                    return workSession;
                });

            Field<ListGraphType<WorkSessionResponseType>>("GetWorkSessions")
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                       .ResolveAsync(async context =>
                       {
                           var workSessions = await workSessionRepository
                           .GetUserWorkSessionsByIdAsync(context.GetArgument<Guid>("id"));
                           return workSessions;
                       });

            Field<WorkSessionResponseType>("GetLastWorkSession")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                       .ResolveAsync(async context =>
                       {
                           var workSession = await workSessionRepository
                           .GetUserLastWorkSessionAsync(context.GetArgument<Guid>("id"));
                           if (workSession is null) context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                           return workSession;
                       });
        }
    }
}
