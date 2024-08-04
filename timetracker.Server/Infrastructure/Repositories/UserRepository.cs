using Dapper;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<string> GetPermissionsByEmailAsync(string Email)
        {
            using var connection = _connectionFactory.Create();

            var permissions = await connection.QueryFirstOrDefaultAsync<string>(
                $"SELECT Permissions FROM {_tableName} WHERE Email = @Email",
                new { Email }
            );

            return permissions;
        }

        public async Task<User> GetUserByEmailAsync(string Email)
        {
            using var connection = _connectionFactory.Create();

            var user = await connection.QueryFirstOrDefaultAsync<User>(
                $"Select * FROM {_tableName} WHERE Email = @Email",
                new { Email }
            );

            return user;
        }

        public async Task<IDictionary<Guid?, User>> GetUsersByIdAsync(IEnumerable<Guid?> ids)
        {
            using var connection = _connectionFactory.Create();

            var users = await connection.QueryAsync<User>(
                $"SELECT * FROM {_tableName} WHERE Id IN @Ids",
                 new { Ids = ids });
            return users.ToDictionary(x => (Guid?)x.Id);
        }

        public async Task<List<WorkSession>> GetWorkSessionsByIdAsync(Guid id)
        {
            using var connection = _connectionFactory.Create();
            var query = "SELECT * FROM WorkSessions WHERE UserId = @UserId";
            var workSessions = await connection.QueryAsync<WorkSession>(query, new { UserId = id });

            return workSessions.ToList();
        }
    }
}
