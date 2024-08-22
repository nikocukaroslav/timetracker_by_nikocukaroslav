using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.Pagination.Models;
using timetracker.Server.API.Pagination.Types;
using timetracker.Server.API.User.Models;
using timetracker.Server.API.User.Types;
using timetracker.Server.API.WorkDay.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Domain.Models;
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
               .Arguments(
                new QueryArguments(
                    new QueryArgument<PaginationRequestType> { Name = "pagination" },
                    new QueryArgument<FilterUsersRequestType> { Name = "filter" },
                    new QueryArgument<SortRequestType> { Name = "sort" }
               ))
               .ResolveAsync(async context =>
               {
                   var pagination = context.GetArgument<PaginationRequest>("pagination");

                   var filter = context.GetArgument<Filter>("filter");

                   var sort = context.GetArgument<Sort>("sort");

                   var paginatedUsers = await userRepository
                   .GetPaginatedUserListAsync(pagination.Page, pagination.PageSize, filter, sort);

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

            Field<ListGraphType<WorkDayResponseType>>("workDays")
                .Arguments(new QueryArguments(new QueryArgument<GetWorkDaysRequestType> { Name = "workDays" }))
                .ResolveAsync(async context =>
                {
                    var workDaysRequest = context.GetArgument<WorkDaysRequest>("workDays");

                    var workDays = await userRepository
                    .GetWorkDaysByUserIdAsync(workDaysRequest);

                    if (workDays == null)
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
