using Dapper;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class WorkSessionRepository : Repository<WorkSession>, IWorkSessionRepository
    {
        public WorkSessionRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}
