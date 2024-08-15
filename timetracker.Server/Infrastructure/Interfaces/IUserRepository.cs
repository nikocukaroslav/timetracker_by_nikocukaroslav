using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<string> GetUserPermissionsByEmailAsync(string email);
        Task<User> GetUserByEmailAsync(string email);
        Task<IDictionary<Guid?, User>> GetUsersByIdAsync(IEnumerable<Guid?> ids);
    }
}
