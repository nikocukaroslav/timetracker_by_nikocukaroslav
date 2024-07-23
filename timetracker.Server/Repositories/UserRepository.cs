using Dapper;
using timetracker.Server.Database;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Repositories;

namespace timetracker.Server.Repositories
{
    public class UserRepository : DapperRepository<Users>, IUserRepository
    {
        public UserRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
        public async Task<string> GetPermissionsAsync(Guid id)
        {
            using var connection = _connectionFactory.Create();

            var permissions = await connection.QueryFirstOrDefaultAsync<string>(
                $"SELECT Permissions FROM {_tableName} WHERE Id = @Id",
                new { Id = id }
            );

            return permissions;
        }
        public async Task<Users> GetUserByEmailAsync(string Email)
        {
            using var connection = _connectionFactory.Create();

            var user = await connection.QueryFirstOrDefaultAsync<Users>(
                $"Select * FROM {_tableName} WHERE Email = @Email",
                new { Email = Email }
            );

            return user;
        }
    }
}
