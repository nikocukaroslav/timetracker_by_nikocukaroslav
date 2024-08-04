using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<string> GetPermissionsByEmailAsync(string Email);
        Task<User> GetUserByEmailAsync(string Email);
        Task<List<WorkSession>> GetWorkSessionsByIdAsync(Guid id);
        Task<IDictionary<Guid?, User>> GetUsersByIdAsync(IEnumerable<Guid?> ids);
    }
}
