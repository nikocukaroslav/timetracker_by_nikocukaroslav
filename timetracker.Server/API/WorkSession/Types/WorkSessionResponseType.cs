using GraphQL.Types;
using timetracker.Server.API.User.Types;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;
using UserModel = timetracker.Server.Domain.Entities.User;
using timetracker.Server.Infrastructure.Interfaces;
using GraphQL.DataLoader;

namespace timetracker.Server.API.WorkSession.Types
{
    public class WorkSessionResponseType : ObjectGraphType<WorkSessionModel>
    {
        public WorkSessionResponseType(IUserRepository userRepository, IDataLoaderContextAccessor accessor)
        {
            Field(t => t.Id);
            Field(t => t.StartTime);
            Field(t => t.EndTime, true);
            Field(t => t.SetBy);
            Field(t => t.EditedAt, true);
            Field(t => t.UserId);
            Field<UserResponseType, UserModel>("editor")
                .ResolveAsync(context =>
                {
                    var loader = accessor.Context.GetOrAddBatchLoader<Guid?, UserModel>("GetUsersByIdAsync", userRepository.GetUsersByIdAsync);

                    return loader.LoadAsync(context.Source.EditorId);
                });
        }
    }
}
