using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class TemporaryLinkRepository : Repository<TemporaryLink>, ITemporaryLinkRepository
    {
        public TemporaryLinkRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}
