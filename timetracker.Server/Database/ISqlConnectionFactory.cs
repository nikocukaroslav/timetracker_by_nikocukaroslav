using System.Data;

namespace timetracker.Server.Database
{
    public interface ISqlConnectionFactory
    {
        IDbConnection Create(); 
    }
}
