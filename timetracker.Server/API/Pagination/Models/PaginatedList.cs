using PaginationModel = timetracker.Server.Domain.Models.Pagination;

namespace timetracker.Server.API.Pagination.Models
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
        public bool HasNextPage => Page < TotalPages;
        public bool HasPreviousPage => Page > 1;
        public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
        public PaginatedList(List<T> items, int count, PaginationModel pagination)
        {
            Items = items;
            TotalCount = count;
            Page = pagination.Page;
            PageSize = pagination.PageSize;
        }
    }
}
