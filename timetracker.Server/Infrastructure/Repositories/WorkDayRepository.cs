using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class WorkDayRepository : Repository<WorkDay>, IWorkDayRepository
    {
        public WorkDayRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public Task<WorkDay> AddAsync(WorkDay[] workDays)
        {
            throw new NotImplementedException();
        }
    }
}
