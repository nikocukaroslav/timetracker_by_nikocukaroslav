using GraphQL.Types;
using timetracker.Server.API.User.Types;
using timetracker.Server.Application.Services;
using timetracker.Server.Infrastructure.Repositories;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;
using UserModel = timetracker.Server.Domain.Entities.User;

using GraphQL.DataLoader;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.API.WorkDay.Types
{
    public class WorkDayResponseType : ObjectGraphType<WorkDayModel>
    {
        public WorkDayResponseType(IUserRepository userRepository, IDataLoaderContextAccessor accessor)
        {
            Field(t => t.Id);
            Field<DateOnlyGraphType>("day")
               .Resolve(context => DateTimeFormatter.DateTimeToDateOnly(context.Source.Day));
            Field<TimeOnlyGraphType>("startTime")
              .Resolve(context => DateTimeFormatter.TimeSpanToTimeOnly(context.Source.StartTime));
            Field<TimeOnlyGraphType>("endTime")
               .Resolve(context => DateTimeFormatter.TimeSpanToTimeOnly(context.Source.EndTime));
            Field<UserResponseType, UserModel>("user")
            .ResolveAsync(context =>
            {
                var loader = accessor.Context.GetOrAddBatchLoader<Guid?, UserModel>("GetUsersByIdAsync", userRepository.GetUsersByIdAsync);

                return loader.LoadAsync(context.Source.UserId);
            });
        }
    }
}
