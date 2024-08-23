using Dapper;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Models;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class WorkSessionRepository : Repository<WorkSession>, IWorkSessionRepository
    {
        public WorkSessionRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }

        public async Task<bool> IsSessionTimeAvailable(WorkSession session)
        {
            using var connection = _connectionFactory.Create();

            var query = $"SELECT COUNT(*) FROM {_tableName} WHERE StartTime < @EndTime AND (EndTime > @StartTime OR EndTime IS NULL) AND Id != @Id";

            var totalCount = await connection.ExecuteScalarAsync<int>(query, session);

            return totalCount == 0;
        }
    }
}
