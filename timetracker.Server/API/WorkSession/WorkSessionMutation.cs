using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Application.Services;
using timetracker.Server.Domain.Enums;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;

namespace timetracker.Server.API.WorkSession
{
    public class WorkSessionMutation : ObjectGraphType
    {
        public WorkSessionMutation(IWorkSessionRepository workSessionRepository)
        {
            this.Authorize();

            Field<CreateSessionResponseType>("createSession")
                 .Arguments(new QueryArguments(new QueryArgument<CreateSessionRequestType> { Name = "session" }))
                 .ResolveAsync(async context =>
                 {
                     var inputSession = context.GetArgument<WorkSessionModel>("session");

                     if (inputSession.StartTime > inputSession.EndTime)
                     {
                         context.Errors.Add(ErrorCode.INVALID_TIME_RANGE);
                         return null;
                     }

                     if (DataValidator.IsSessionDurationValid(inputSession.StartTime, inputSession.EndTime))
                     {
                         context.Errors.Add(ErrorCode.WORK_SESSION_TOO_LONG);
                         return null;
                     }

                     if (DataValidator.IsTimeInFuture(inputSession.EndTime))
                     {
                         context.Errors.Add(ErrorCode.WORK_SESSION_IN_FUTURE);
                         return null;
                     }

                     if (!DataValidator.IsSameDay(inputSession.StartTime, inputSession.EndTime))
                     {
                         context.Errors.Add(ErrorCode.START_AND_END_TIME_ON_DIFFERENT_DAYS);
                         return null;
                     }

                     if (!(await workSessionRepository.IsSessionTimeAvailable(inputSession)))
                     {
                         context.Errors.Add(ErrorCode.WORK_SESSION_TIME_CONFLICT);
                         return null;
                     }

                     inputSession.SetBy = SetBy.MANUALLY.ToString();

                     return await workSessionRepository.CreateAsync(inputSession);
                 });

            Field<WorkSessionResponseType>("updateSession")
                .Arguments(new QueryArguments(new QueryArgument<UpdateSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");

                    if (inputSession.StartTime > inputSession.EndTime)
                    {
                        context.Errors.Add(ErrorCode.INVALID_TIME_RANGE);
                        return null;
                    }

                    if(DataValidator.IsSessionDurationValid(inputSession.StartTime, inputSession.EndTime))
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_TOO_LONG);
                        return null;
                    }

                    if (DataValidator.IsTimeInFuture(inputSession.EndTime))
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_IN_FUTURE);
                        return null;
                    }

                    if (!DataValidator.IsSameDay(inputSession.StartTime, inputSession.EndTime))
                    {
                        context.Errors.Add(ErrorCode.START_AND_END_TIME_ON_DIFFERENT_DAYS);
                        return null;
                    }

                    if (!await workSessionRepository.IsSessionTimeAvailable(inputSession))
                    {
                        context.Errors.Add(ErrorCode.WORK_SESSION_TIME_CONFLICT);
                        return null;
                    }

                    var session = await workSessionRepository.GetByIdAsync(inputSession.Id);

                    if (session is null)
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

            Field<BooleanGraphType>("deleteSession")
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

            Field<StartSessionResponseType>("startSession")
                .AuthorizeWithPolicy(Permission.MANAGE_OWN_TIME.ToString())
                .Arguments(new QueryArguments(new QueryArgument<StartSessionRequestType> { Name = "session" }))
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSessionModel>("session");
                    inputSession.SetBy = SetBy.AUTOMATIC.ToString();

                    return await workSessionRepository.CreateAsync(inputSession);
                });

            Field<StopSessionResponseType>("stopSession")
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
        }
    }
}
