using GraphQL.Types;
using timetracker.Server.API.Pagination.Models;

namespace timetracker.Server.API.Pagination.Types
{
    public class PaginationResponseType<TGraphType, TEntitiy>
        : ObjectGraphType<PaginatedList<TEntitiy>> where TGraphType : IGraphType
    {
        public PaginationResponseType()
        {
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
