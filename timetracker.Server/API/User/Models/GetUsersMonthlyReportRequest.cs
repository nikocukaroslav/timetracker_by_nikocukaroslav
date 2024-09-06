using timetracker.Server.Domain.Models;
using PaginationModel = timetracker.Server.Domain.Models.Pagination;

namespace timetracker.Server.API.User.Models
{
    public class GetUsersMonthlyReportRequest
    {
        public long StartDate {  get; set; }
        public long EndDate { get; set; }
        public PaginationModel Pagination { get; set; }
        public FilterUsers Filter { get; set; }
        public Sort Sort { get; set; }
    }
}
