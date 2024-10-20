using Dapper;
using System.Collections;
using System.Text;
using timetracker.Server.Application.Models;
using timetracker.Server.Domain.Models;

namespace timetracker.Server.Application.Services
{
    public class QueryBuilder
    {
        private List<string> Filters { get; set; } = [];
        private List<string> Sort { get; set; } = [];
        private string? PaginationQuery { get; set; }
        private string? DistinctPath { get; set; }
        private string? CTEPath { get; set; }
        private string? JoinPath { get; set; }
        private string? GroupByPart { get; set; }
        private DynamicParameters Parameters { get; set; } = new();

        public QueryBuilder()
        {

        }

        public QueryBuilder(DynamicParameters Parameters)
        {
            this.Parameters = Parameters;
        }

        public QueryBuilder UseDISTINCT(string column, bool convertToDay = false)
        {
            var columnFragment = convertToDay ? ConvertToDay(column) : column;
            DistinctPath = $"DISTINCT {columnFragment}";
            return this;
        }

        public QueryBuilder UseCTE(string cte)
        {
            CTEPath = cte;
            return this;
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

        public QueryBuilder AddBetweenFilter(string column, dynamic fromValue, dynamic toValue)
        {
            Filters.Add($"{column} BETWEEN {fromValue} AND {toValue}");
            return this;
        }

        public QueryBuilder AddCTEResultFilter(string column, bool convertToDay = false)
        {
            var columnFragment = convertToDay ? ConvertToDay(column) : column;
            Filters.Add($"{columnFragment} in (SELECT Item FROM List)");
            return this;
        }

        public QueryBuilder AddSort(string column, bool ascending)
        {
            if (column == "IsEmployed")
            {
                Sort.Add($"CASE WHEN {column} = 1 THEN 1 ELSE 0 END {(ascending ? "ASC" : "DESC")}");
            }
            else
            {
                Sort.Add($"{column} {(ascending ? "ASC" : "DESC")}");
            }

            return this;
        }

        public QueryBuilder AddCTEPartSort(bool ascending)
        {
            return AddSort("Item", ascending);
        }

        public QueryBuilder AddPagination(Pagination pagination)
        {
            PaginationQuery = "OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

            Parameters.Add("Offset", (pagination.Page - 1) * pagination.PageSize);
            Parameters.Add("PageSize", pagination.PageSize);

            return this;
        }

        public QueryBuilder AddLeftJoin(string tableName, string relationship)
        {
            JoinPath = $"LEFT JOIN {tableName} ON {relationship}";
            return this;
        }

        public QueryBuilder AddGroupBy(string columns)
        {
            GroupByPart = $"GROUP BY {columns}";
            return this;
        }

        public QueryCreateResponse Create(string fromQuery, string select = "*")
        {
            var selectPath = DistinctPath is null ? select : DistinctPath;
            var baseQuery = $"{CTEPath} SELECT {selectPath} {fromQuery}";
            var sqlQuery = new StringBuilder(baseQuery);
            if (JoinPath != null)
                sqlQuery.Append(" " + JoinPath);
            var sqlTotalCountQuery = new StringBuilder();

            ApplyFilters(sqlQuery);

            if (GroupByPart != null)
                sqlQuery.Append(" " + GroupByPart);

            if (PaginationQuery != null)
            {
                if (GroupByPart != null)
                {
                    sqlTotalCountQuery
                        .Append($"SELECT COUNT(*) FROM ({sqlQuery}) AS GroupedItems");
                }
                else
                {
                    var countPath = selectPath is null ? "*" : selectPath;

                    sqlTotalCountQuery
                        .Append(baseQuery)
                        .Replace(countPath, $"COUNT({countPath})");

                    if (JoinPath != null)
                        sqlTotalCountQuery.Append(" " + JoinPath);

                    ApplyFilters(sqlTotalCountQuery);

                    if (GroupByPart != null)
                        sqlTotalCountQuery.Append(" " + GroupByPart);
                }
                ApplySort(sqlQuery);
                sqlQuery.Append($" {PaginationQuery}");
            }
            else ApplySort(sqlQuery);

            return new QueryCreateResponse()
            {
                Query = sqlQuery.ToString(),
                TotalCountQuery = sqlTotalCountQuery.ToString(),
                Parameters = Parameters
            };
        }
        public QueryCreateResponse CreateCTEPart(string fromQuery)
        {
            var baseQuery = $"WITH List AS ( SELECT";

            var totalCountQuery = new StringBuilder();

            var sqlQuery = new StringBuilder(baseQuery);

            if (DistinctPath != null) sqlQuery.Append($" {DistinctPath} AS Item");
            sqlQuery.Append($" {fromQuery}");

            ApplyFilters(sqlQuery);
            ApplySort(sqlQuery);

            if (PaginationQuery != null)
            {
                sqlQuery.Append($" {PaginationQuery}");

                var itemToCount = DistinctPath is null ? "*" : DistinctPath;
                totalCountQuery
                    .Append($"SELECT COUNT({itemToCount}) {fromQuery}");

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
