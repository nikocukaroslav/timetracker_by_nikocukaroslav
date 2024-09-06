using GraphQL;
using GraphQL.Types;
using PaginationModel = timetracker.Server.Domain.Models.Pagination;
using timetracker.Server.API.Pagination.Types;
using timetracker.Server.API.User.Models;
using timetracker.Server.API.User.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Domain.Models;
using timetracker.Server.Infrastructure.Interfaces;
using UserModel = timetracker.Server.Domain.Entities.User;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;
using timetracker.Server.Application.Services;

namespace timetracker.Server.API.User
{
    public class UserQuery : ObjectGraphType
    {
        public UserQuery(IUserRepository userRepository)
        {
            this.Authorize();

            Field<PaginationResponseType<UserResponseType, UserModel>>("users")
               .Arguments(new QueryArguments(
                    new QueryArgument<PaginationRequestType> { Name = "pagination" },
                    new QueryArgument<FilterUsersRequestType> { Name = "filter" },
                    new QueryArgument<SortRequestType> { Name = "sort" }
               ))
               .ResolveAsync(async context =>
               {
                   var pagination = context.GetArgument<PaginationModel>("pagination");
                   var filter = context.GetArgument<FilterUsers>("filter");
                   var sort = context.GetArgument<Sort>("sort");

                   if (pagination == null)
                   {
                       context.Errors.Add(ErrorCode.INVALID_PAGINATION_SETTINGS);
                       return null;
                   }

                   var paginatedUsers = await userRepository.GetPaginatedUserListAsync(pagination, filter, sort);

                   return paginatedUsers;
               });

            Field<UserResponseType>("user")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var user = await userRepository.GetByIdAsync(context.GetArgument<Guid>("id"));

                   if (user == null)
                   {
                       context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                       return null;
                   }

                   return user;
               });

            Field<ListGraphType<FindUsersResponseType>>("find")
                .Arguments(new QueryArguments(new QueryArgument<StringGraphType> { Name = "input" }))
                .ResolveAsync(async context =>
                {
                    var input = context.GetArgument<string>("input");

                    var foundUsers = await userRepository.FindUsersAsync(input);

                    if (foundUsers == null)
                    {
                        context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                        return null;
                    }

                    return foundUsers;
                });

            Field<UserWorkDaysResponseType>("workDays")
                .Arguments(new QueryArguments(new QueryArgument<GetWorkDaysRequestType> { Name = "workDays" }))
                .ResolveAsync(async context =>
                {
                    var workDaysRequest = context.GetArgument<WorkDaysRequest>("workDays");

                    var workDays = await userRepository.GetWorkDaysByUserIdAsync(workDaysRequest);

                    if (workDays == null)
                    {
                        context.Errors.Add(ErrorCode.WORK_DAY_NOT_FOUND);
                        return null;
                    }

                    var user = await userRepository.GetByIdAsync(workDaysRequest.UserId);

                    var userWorkDays = new UserWorkDaysResponse()
                    {
                        User = user,
                        Days = workDays
                    };

                    return userWorkDays;
                });

            Field<PaginationResponseType<WorkSessionResponseType, WorkSessionModel>>("workSessions")
                .Arguments(new QueryArguments(
                    new QueryArgument<GuidGraphType> { Name = "id" },
                    new QueryArgument<PaginationRequestType> { Name = "pagination" }
                ))
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("id");
                    var pagination = context.GetArgument<PaginationModel>("pagination");

                    if (pagination == null)
                    {
                        context.Errors.Add(ErrorCode.INVALID_PAGINATION_SETTINGS);
                        return null;
                    }

                    var workSessions = await userRepository.GetPaginatedWorkSessionsByUserIdAsync(id, pagination);

                    return workSessions;
                });

            Field<WorkSessionResponseType>("lastWorkSession")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var workSession = await userRepository.GetLastUserWorkSessionAsync(context.GetArgument<Guid>("id"));
                   if (workSession is null)
                   {
                       context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                       return null;
                   }
                   return workSession;
               });

            Field<PaginationResponseType<UserMonthlyReportResponseType, UserMonthlyReport>>("usersReport")
                .Arguments(new QueryArguments(new QueryArgument<GetUsersMonthlyReportRequestType> { Name = "usersReport" }))
                .ResolveAsync(async context =>
                {
                    var usersMonthlyReport = context.GetArgument<GetUsersMonthlyReportRequest>("usersReport");
                    return await userRepository.GetUserMonthlyReportsAsync(
                        usersMonthlyReport.StartDate,
                        usersMonthlyReport.EndDate,
                        usersMonthlyReport.Pagination,
                        usersMonthlyReport.Filter,
                        usersMonthlyReport.Sort
                        );
                });
        }
    }
}
