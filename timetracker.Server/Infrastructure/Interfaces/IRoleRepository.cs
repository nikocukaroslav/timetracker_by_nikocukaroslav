using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<IDictionary<Guid?, Role>> GetRolesByIdAsync(IEnumerable<Guid?> ids);
    }
}
