using Dapper;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class TemporaryLinkRepository : Repository<TemporaryLink>, ITemporaryLinkRepository
    {
        public TemporaryLinkRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
        public virtual async Task DeleteAllAsync(Guid userId)
        {
            using var connection = _connectionFactory.Create();
            var sql = $"DELETE FROM {_tableName} WHERE UserId = @UserId";
            await connection.ExecuteAsync(sql, new { UserId = userId });
        }
    }
}
