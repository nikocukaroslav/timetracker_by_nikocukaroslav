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

        public async Task<WorkSession> GetUserLastWorkSessionAsync(Guid id)
        {
            using var connection = _connectionFactory.Create();

            var workSession = await connection.QueryFirstOrDefaultAsync<WorkSession>(
                "SELECT * FROM WorkSessions WHERE UserId = @UserId AND EndTime IS NULL",
                new { UserId = id }
            );

            return workSession;
        }

        public async Task<List<WorkSession>> GetUserWorkSessionsByIdAsync(Guid id)
        {
            using var connection = _connectionFactory.Create();
            var query = "SELECT * FROM WorkSessions WHERE UserId = @UserId ORDER BY StartTime DESC";
            var workSessions = await connection.QueryAsync<WorkSession>(query, new { UserId = id });

            return workSessions.ToList();
        }
    }
}
