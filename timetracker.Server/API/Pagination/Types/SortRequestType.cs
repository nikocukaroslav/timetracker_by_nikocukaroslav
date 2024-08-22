using GraphQL.Types;
using timetracker.Server.Domain.Models;

namespace timetracker.Server.API.Pagination.Types
{
    public class SortRequestType : InputObjectGraphType<Sort>
    {
        public SortRequestType()
        {
            Field<NonNullGraphType<StringGraphType>>("sortBy");
            Field<BooleanGraphType>("ascending");
        }
    }
}
