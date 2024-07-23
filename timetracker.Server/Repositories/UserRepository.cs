using Dapper;
using timetracker.Server.Database;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Repositories;

namespace timetracker.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public UserRepository(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<string> GetPermissionsAsync(Guid id)
        {
            using var connection = _connectionFactory.Create();

            var permissions = await connection.QueryFirstAsync<string>(
                "SELECT Permissions FROM Users WHERE Id = @Id",
                new { Id = id }
            );

            return permissions;
        }
        public async Task<User> GetUserByEmailAsync(string Email)
        {
            using var connection = _connectionFactory.Create();

            var user = await connection.QueryFirstOrDefaultAsync<User>(
                "Select Id, Name, Surname, Email, Password, Permissions FROM Users " +
                "WHERE Email = @Email",
                new { Email = Email }
            );

            return user;
        }
    }
}
