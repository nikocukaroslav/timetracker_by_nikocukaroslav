using GraphQL.Types;

namespace timetracker.Server.API.Pagination.Types
{
    public class PaginationRequestType : InputObjectGraphType
    {
        public PaginationRequestType()
        {
            Field<NonNullGraphType<IntGraphType>>("page");
            Field<NonNullGraphType<IntGraphType>>("pageSize");
        }
    }
}
