using timetracker.Server.API.Pagination.Models;
using timetracker.Server.API.User.Models;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Models;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<PaginatedList<User>> GetPaginatedUserListAsync(Pagination pagintaion, FilterUsers? filter, Sort? sort); 
        Task<string> GetUserPermissionsByEmailAsync(string email);
        Task<User> GetUserByEmailAsync(string email);
        Task<IDictionary<Guid?, User>> GetUsersByIdAsync(IEnumerable<Guid?> ids);
        Task<WorkSession> GetLastUserWorkSessionAsync(Guid id);
        Task<List<WorkSession>> GetWorkSessionsByUserIdAsync(Guid id);
        Task<List<WorkDay>> GetWorkDaysByUserIdAsync(WorkDaysRequest workDaysRequest);
        Task<List<User>> FindUsersAsync(string input);
    }
}
