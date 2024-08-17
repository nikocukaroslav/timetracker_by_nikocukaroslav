using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Pagination.Models;
using timetracker.Server.API.Pagination.Types;
using timetracker.Server.API.User.Models;
using timetracker.Server.API.User.Types;
using timetracker.Server.API.WorkDay.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;
using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.User
{
    public class UserQuery : ObjectGraphType
    {
        public UserQuery(IUserRepository userRepository)
        {
            this.Authorize();

            Field<PaginationResponseType<UserResponseType, UserModel>>("users")
               .Arguments(new QueryArguments(new QueryArgument<PaginationRequestType> { Name = "pagination" }))
               .ResolveAsync(async context =>
               {
                   var pagination = context.GetArgument<PaginationRequest>("pagination");

                   var paginatedUsers = await userRepository
                   .GetPaginatedUserListAsync(pagination.Page, pagination.PageSize);

                   return paginatedUsers;
               });

            Field<UserResponseType>("user")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var user = await userRepository.GetByIdAsync(context.GetArgument<Guid>("id"));
                   if (user == null) context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                   return user;
               });

            Field<ListGraphType<WorkDayResponseType>>("workDays")
                .Arguments(new QueryArguments(new QueryArgument<GetWorkDaysRequestType> { Name = "workDays" }))
                .ResolveAsync(async context =>
                {
                    var workDaysRequest = context.GetArgument<WorkDaysRequest>("workDays");

                    var workDays = await userRepository
                    .GetWorkDaysByUserIdAsync(workDaysRequest);

                    if (workDays == null || !workDays.Any())
                    {
                        context.Errors.Add(ErrorCode.WORK_DAY_NOT_FOUND);
                        return null;
                    }

                    return workDays;
                });

            Field<ListGraphType<WorkSessionResponseType>>("workSessions")
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    var workSessions = await userRepository
                    .GetWorkSessionsByUserIdAsync(context.GetArgument<Guid>("id"));
                    return workSessions;
                });

            Field<WorkSessionResponseType>("lastWorkSession")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var workSession = await userRepository
                   .GetLastUserWorkSessionAsync(context.GetArgument<Guid>("id"));
                   if (workSession is null) context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                   return workSession;
               });
        }
    }
}
