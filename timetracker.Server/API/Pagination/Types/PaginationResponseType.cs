using GraphQL.Types;
using timetracker.Server.API.Pagination.Models;

namespace timetracker.Server.API.Pagination.Types
{
    public class PaginationResponseType<TGraphType, TEntity>
        : ObjectGraphType<PaginatedList<TEntity>> where TGraphType : IGraphType
    {
        public PaginationResponseType()
        {
            Name = $"{typeof(TEntity).Name}PaginationResponse";

            Field<ListGraphType<TGraphType>>("items");
            Field<IntGraphType>("totalCount");
            Field<IntGraphType>("pageSize");
            Field<IntGraphType>("page");
            Field<BooleanGraphType>("hasNextPage");
            Field<BooleanGraphType>("hasPreviousPage");
            Field<IntGraphType>("totalPages");
        }
    }
}
