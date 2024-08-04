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

        public override async Task<WorkSession> AddAsync(WorkSession workSession)
        {
            using var connection = _connectionFactory.Create();

            var sql = $"INSERT INTO {_tableName} (StartTime, EndTime, SetBy, EditedById, EditedAt, UserId) " +
                $"OUTPUT INSERTED.* VALUES (@StartTime, @EndTime, @SetBy, @EditedById, @EditedAt, @UserId)";

            return await connection.QuerySingleAsync<WorkSession>(sql, workSession);
        }
        public override async Task<WorkSession> UpdateAsync(WorkSession workSession)
        {
            using var connection = _connectionFactory.Create();

            var sql = $"UPDATE {_tableName} SET StartTime = @StartTime, EndTime = @EndTime, " +
                $"SetBy = @SetBy, EditedById = @EditedById, EditedAt = @EditedAt WHERE Id = @Id";
            await connection.ExecuteAsync(sql, workSession);

            var updatedSession = await connection.QuerySingleAsync<WorkSession>($"SELECT * FROM {_tableName} WHERE Id = @Id", new { Id = workSession.Id });

            return updatedSession;
        }
    }
}
