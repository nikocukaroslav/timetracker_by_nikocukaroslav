using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IWorkDayRepository
    {
        Task<WorkDay> AddAsync(WorkDay[] workDays);
    }
}
