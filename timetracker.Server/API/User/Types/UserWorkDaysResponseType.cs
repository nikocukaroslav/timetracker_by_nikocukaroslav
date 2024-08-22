using GraphQL.Types;
using timetracker.Server.API.User.Models;
using timetracker.Server.API.WorkDay.Types;

namespace timetracker.Server.API.User.Types
{
    public class UserWorkDaysResponseType : ObjectGraphType<UserWorkDaysResponse>
    {
        public UserWorkDaysResponseType()
        {
            Field<UserResponseType>("user").Resolve(context => context.Source.User);
            Field<ListGraphType<WorkDayResponseType>>("workDays").Resolve(context=> context.Source.Days);
        }
    }
}
