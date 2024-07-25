using System.Data;

namespace timetracker.Server.Infrastructure.Database
{
    public interface ISqlConnectionFactory
    {
        IDbConnection Create();
    }
}
