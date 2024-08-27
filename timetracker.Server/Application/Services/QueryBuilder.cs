using Dapper;
using System.Collections;
using System.Text;
using timetracker.Server.Application.Models;
using timetracker.Server.Domain.Models;

namespace timetracker.Server.Application.Services
{
    public class QueryBuilder
    {
        private string BaseQuery { get; set; }
        private List<string> Filters { get; set; } = [];
        private List<string> Sort { get; set; } = [];
        private string? PaginationQuery { get; set; }
        private DynamicParameters Parameters { get; set; } = new();

        public QueryBuilder(string baseQuery)
        {
            BaseQuery = baseQuery;
        }

        public QueryBuilder AddFilter(string column, dynamic? value)
        {
            if (value != null)
            {
                if (value is IEnumerable)
                {
                    Filters.Add($"{column} IN @{column}");
                }
                else
                {
                    Filters.Add($"{column} = @{column}");
                }

                Parameters.Add(column, value);
            }

            return this;
        }

        public QueryBuilder AddSort(string column, bool ascending)
        {
            Sort.Add($"{column} {(ascending ? "ASC" : "DESC")}");

            return this;
        }

        public QueryBuilder AddPagination(Pagination pagination)
        {
            PaginationQuery = "OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

            Parameters.Add("Offset", (pagination.Page - 1) * pagination.PageSize);
            Parameters.Add("PageSize", pagination.PageSize);

            return this;
        }

        public QueryCreateResponse Create()
        {
            var sqlQuery = new StringBuilder(BaseQuery);
            var sqlTotalCountQuery = new StringBuilder();

            var filterQuery = new StringBuilder();
            var sortQuery = new StringBuilder();

            if (Filters.Count != 0)
            {
                filterQuery.AppendJoin(" AND ", Filters);

                sqlQuery.Append($" WHERE {filterQuery}");
            }

            if (Sort.Count != 0)
            {
                sortQuery.AppendJoin(", ", Sort);

                sqlQuery.Append($" ORDER BY {sortQuery}");
            }

            if (PaginationQuery != null)
            {
                sqlQuery.Append($" {PaginationQuery}");

                sqlTotalCountQuery
                    .Append(BaseQuery)
                    .Replace("*", "COUNT(*)");

                if (Filters.Count != 0)
                {
                    sqlTotalCountQuery.Append($" WHERE {filterQuery}");
                }
            }   

            return new QueryCreateResponse()
            {
                Query = sqlQuery.ToString(),
                TotalCountQuery = sqlTotalCountQuery.ToString(),
                Parameters = Parameters
            };
        }
    }
}
