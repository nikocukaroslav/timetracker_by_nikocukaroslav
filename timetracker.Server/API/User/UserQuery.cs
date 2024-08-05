using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.User.Types;
using timetracker.Server.API.WorkSession.Types;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.User
{
    public class UserQuery : ObjectGraphType
    {
        public UserQuery(IUserRepository userRepository)
        {
            this.Authorize();

            Field<ListGraphType<UserResponseType>>("GetUsers")
               .ResolveAsync(async context =>
               {
                   var users = await userRepository.GetAllAsync();
                   return users;
               });
            Field<UserResponseType>("GetUser")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var user = await userRepository.GetByIdAsync(context.GetArgument<Guid>("id"));
                   if (user == null) context.Errors.Add(ErrorCode.USER_NOT_FOUND);
                   return user;
               });
            Field<ListGraphType<WorkSessionResponseType>>("GetWorkSessions")
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    var workSessions = await userRepository.GetUserWorkSessionsByIdAsync(context.GetArgument<Guid>("id"));
                    return workSessions;
                });
            Field<WorkSessionResponseType>("GetLastWorkSession")
                .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                .ResolveAsync(async context =>
                {
                    var workSession = await userRepository.GetUserLastWorkSessionAsync(context.GetArgument<Guid>("id"));
                    if (workSession is null) context.Errors.Add(ErrorCode.WORK_SESSION_NOT_FOUND);
                    return workSession;
                });
        }
    }
}
