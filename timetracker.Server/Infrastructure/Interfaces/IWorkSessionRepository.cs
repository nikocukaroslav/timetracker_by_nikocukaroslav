using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IWorkSessionRepository : IRepository<WorkSession>
    {
        Task<WorkSession> GetUserLastWorkSessionAsync(Guid id);
        Task<List<WorkSession>> GetUserWorkSessionsByIdAsync(Guid id);
    }
}
