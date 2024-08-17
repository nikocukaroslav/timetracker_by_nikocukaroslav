using GraphQL.Types;

namespace timetracker.Server.API.Pagination.Types
{
    public class PaginationRequestType : InputObjectGraphType
    {
        public PaginationRequestType()
        {
            Field<IntGraphType>("page");
            Field<IntGraphType>("pageSize");
        }
    }
}
