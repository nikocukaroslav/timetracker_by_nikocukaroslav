using timetracker.Server.Domain.Entities;
using timetracker.Server.Repositories;

namespace timetracker.Server.Domain.Repositories
{
    public interface IUserRepository : IRepository<Users>
    {
        Task<string> GetPermissionsAsync(Guid id);
        Task<Users> GetUserByEmailAsync(string Email);
    }
}
