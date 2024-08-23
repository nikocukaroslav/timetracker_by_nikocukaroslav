using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IWorkSessionRepository : IRepository<WorkSession>
    {
        Task<bool> IsSessionTimeAvailable(WorkSession session);
    }
}
