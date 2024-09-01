using Dapper;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public RoleRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IDictionary<Guid?, Role>> GetRolesByIdAsync(IEnumerable<Guid?> ids)
        {
            using var connection = _connectionFactory.Create();

            var roles = await connection.QueryAsync<Role>(
                $"SELECT * FROM {_tableName} WHERE Id IN @Ids",
                new { Ids = ids }
            );

            return roles.ToDictionary(x => (Guid?)x.Id);
        }
    }
}
