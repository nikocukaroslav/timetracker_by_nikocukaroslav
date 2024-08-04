using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;
using timetracker.Server.Infrastructure.Repositories;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;


namespace timetracker.Server.API.WorkSession
{
    public class WorkSessionMutation : ObjectGraphType
    {
        public WorkSessionMutation(IWorkSessionRepository workSessionRepository)
        {
            Field<WorkSessionResponseType>("StartSession")
                .AuthorizeWithPolicy(Permission.MANAGE_OWN_TIME.ToString())
                .Arguments(new QueryArguments(new QueryArgument<StartSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    inputSession.SetBy = "system";

                    return await workSessionRepository.AddAsync(inputSession);
                });
            Field<WorkSessionResponseType>("stopSession")
                .AuthorizeWithPolicy(Permission.MANAGE_OWN_TIME.ToString())
                .Arguments(new QueryArguments(new QueryArgument<StopSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    var session = await workSessionRepository.GetByIdAsync(inputSession.Id);
                    session.EndTime = inputSession.EndTime;

                    return await workSessionRepository.UpdateAsync(session);
                });
            Field<WorkSessionResponseType>("EditSession")
                .Authorize()
                .Arguments(new QueryArguments(new QueryArgument<EditSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    var session = await workSessionRepository.GetByIdAsync(inputSession.Id);
                    session.StartTime = inputSession.StartTime;
                    session.EndTime = inputSession.EndTime;
                    session.EditedById = inputSession.EditedById;
                    session.EditedAt = inputSession.EditedAt;

                    return await workSessionRepository.UpdateAsync(session);
                });
            Field<WorkSessionResponseType>("AddSession")
                .Authorize()
                .Arguments(new QueryArguments(new QueryArgument<AddSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    inputSession.SetBy = "manually";

                    return await workSessionRepository.AddAsync(inputSession); ;
                });
            Field<StringGraphType>("DeleteSession")
                .Authorize()
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    Guid id = context.GetArgument<Guid>("id");
                    var workSession = await workSessionRepository.GetByIdAsync(id);
                    if (workSession is null)
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                        return null;
                    }
                    await workSessionRepository.DeleteAsync(id);

                    return "Work session deleted successfully";
                });
        }
    }
}
