using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Infrastructure.Interfaces
{
    public interface ITemporaryLinkRepository : IRepository<TemporaryLink>
    {
        Task DeleteAllAsync(Guid userId);
    }
}
