using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;


namespace timetracker.Server.API.WorkSession
{
    public class WorkSessionMutation : ObjectGraphType
    {
        public WorkSessionMutation(IRepository<WorkSessionModel> workSessionRepository)
        {
            this.Authorize();
            Field<StartSessionResponseType>("StartSession")
                .AuthorizeWithPolicy(Permission.MANAGE_OWN_TIME.ToString())
                .Arguments(new QueryArguments(new QueryArgument<StartSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    inputSession.SetBy = SetBy.SYSTEM.ToString();

                    return await workSessionRepository.AddAsync(inputSession);
                });
            Field<StopSessionResponseType>("StopSession")
                .AuthorizeWithPolicy(Permission.MANAGE_OWN_TIME.ToString())
                .Arguments(new QueryArguments(new QueryArgument<StopSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    var session = await workSessionRepository.GetByIdAsync(inputSession.Id);
                    if (session.EndTime != null)
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_ALREADY_STOPPED);
                        return null;
                    }
                    session.EndTime = inputSession.EndTime;

                    return await workSessionRepository.UpdateAsync(session);
                });
            Field<WorkSessionResponseType>("EditSession")
                .Arguments(new QueryArguments(new QueryArgument<EditSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    var session = await workSessionRepository.GetByIdAsync(inputSession.Id);
                    if(session is null)
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                        return null;
                    }
                    session.StartTime = inputSession.StartTime;
                    session.EndTime = inputSession.EndTime;
                    session.EditorId = inputSession.EditorId;
                    session.EditedAt = inputSession.EditedAt;

                    return await workSessionRepository.UpdateAsync(session);
                });
            Field<AddSessionResponseType>("AddSession")
                .Arguments(new QueryArguments(new QueryArgument<AddSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    inputSession.SetBy = SetBy.MANUALLY.ToString();

                    return await workSessionRepository.AddAsync(inputSession);
                });
            Field<BooleanGraphType>("DeleteSession")
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

                    return true;
                });
        }
    }
}
