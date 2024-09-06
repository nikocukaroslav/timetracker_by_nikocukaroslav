using GraphQL.Types;
using timetracker.Server.API.Pagination.Types;

namespace timetracker.Server.API.User.Types
{
    public class GetUsersMonthlyReportRequestType : InputObjectGraphType
    {
        public GetUsersMonthlyReportRequestType()
        {
            Field<NonNullGraphType<LongGraphType>>("startDate");
            Field<NonNullGraphType<LongGraphType>>("endDate");
            Field<NonNullGraphType<PaginationRequestType>>("pagination");
            Field<SortRequestType>("sort");
            Field<FilterUsersRequestType>("filter");
        }
    }
}
