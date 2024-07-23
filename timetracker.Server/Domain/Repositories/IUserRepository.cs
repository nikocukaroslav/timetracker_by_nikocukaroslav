using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<string> GetPermissionsAsync(Guid id);
        Task<User> GetUserByEmailAsync(string Email);
    }
}
