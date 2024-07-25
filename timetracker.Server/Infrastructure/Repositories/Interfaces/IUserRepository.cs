using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<Users>
    {
        Task<string> GetPermissionsAsync(Guid id);
        Task<Users> GetUserByEmailAsync(string Email);
    }
}
