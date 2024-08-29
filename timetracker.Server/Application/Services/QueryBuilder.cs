using Dapper;
using System.Collections;
using System.Text;
using timetracker.Server.API;
using timetracker.Server.Application.Models;
using timetracker.Server.Domain.Models;

namespace timetracker.Server.Application.Services
{
    public class QueryBuilder
    {
        private List<string> Filters { get; set; } = [];
        private List<string> Sort { get; set; } = [];
        private string? PaginationQuery { get; set; }
        private DynamicParameters Parameters { get; set; } = new();

        public QueryBuilder()
        {

        }

        public QueryBuilder(DynamicParameters Parameters)
        {
            this.Parameters = Parameters;
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

        public QueryBuilder AddWithPartFilter(string column, bool convert = true)
        {
            var columnFragment = convert ? ConvertToDay(column) : column;
            Filters.Add($"{columnFragment} in (SELECT Item FROM List)");
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

        public QueryCreateResponse Create(string BaseQuery)
        {
            var sqlQuery = new StringBuilder(BaseQuery);
            var sqlTotalCountQuery = new StringBuilder();

            ApplyFilters(sqlQuery);

            ApplySort(sqlQuery);

            if (PaginationQuery != null)
            {
                sqlQuery.Append($" {PaginationQuery}");

                sqlTotalCountQuery
                    .Append(BaseQuery)
                    .Replace("*", "COUNT(*)");

                ApplyFilters(sqlTotalCountQuery);
            }

            return new QueryCreateResponse()
            {
                Query = sqlQuery.ToString(),
                TotalCountQuery = sqlTotalCountQuery.ToString(),
                Parameters = Parameters
            };
        }
        public QueryCreateResponse CreateWithPart(string fromQuery, string column)
        {
            var baseQuery = $"WITH List AS ( SELECT DISTINCT";

            var totalCountQuery = new StringBuilder();

            var sqlQuery = new StringBuilder(baseQuery);

            sqlQuery.Append($" {ConvertToDay(column)} AS Item {fromQuery}");

            ApplyFilters(sqlQuery);
            ApplySort(sqlQuery);

            if (PaginationQuery != null)
            {
                sqlQuery.Append($" {PaginationQuery}");

                totalCountQuery
                    .Append($"SELECT COUNT(DISTINCT")
                    .Append($" {ConvertToDay(column)}) {fromQuery}");

                ApplyFilters(totalCountQuery);
            }
            sqlQuery.Append(')');

            var response = new QueryCreateResponse()
            {
                Parameters = Parameters,
                TotalCountQuery = totalCountQuery.ToString(),
                Query = sqlQuery.ToString(),
            };

            return response;
        }

        private string ConvertToDay(string timeColumn)
        {
            return $"CONVERT(DATE, DATEADD(HOUR, 3, DATEADD(SECOND, {timeColumn} / 1000, '1970-01-01')))";
        }

        private void ApplyFilters(params StringBuilder[] queries)
        {
            if (Filters.Count != 0)
            {
                var filterQuery = new StringBuilder();
                filterQuery.AppendJoin(" AND ", Filters);
                foreach (var query in queries)
                    query.Append($" WHERE {filterQuery}");
            }
        }

        private void ApplySort(params StringBuilder[] queries)
        {
            if (Sort.Count != 0)
            {
                var sortQuery = new StringBuilder();
                sortQuery.AppendJoin(", ", Sort);
                foreach (var query in queries)
                    query.Append($" ORDER BY {sortQuery}");
            }
        }
    }

}
