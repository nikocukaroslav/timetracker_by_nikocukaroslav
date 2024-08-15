using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IWorkDayRepository : IRepository<WorkDay>
    {
        Task<List<WorkDay>> GetUserWorkDaysByIdAsync(Guid id);
    }
}
