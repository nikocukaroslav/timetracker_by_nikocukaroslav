using Dapper;

namespace timetracker.Server.Application.Models
{
    public class QueryCreateResponse
    {
        public string Query { get; set; } = "";
        public string TotalCountQuery { get; set; } = "";
        public DynamicParameters Parameters { get; set; }
    }
}
