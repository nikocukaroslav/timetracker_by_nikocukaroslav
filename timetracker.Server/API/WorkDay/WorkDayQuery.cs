using GraphQL.Types;
using timetracker.Server.Infrastructure.Interfaces;
using timetracker.Server.API.WorkDay.Types;
using GraphQL;
using timetracker.Server.Domain.Errors;

namespace timetracker.Server.API.WorkDay
{
    public class WorkDayQuery : ObjectGraphType
    {
        public WorkDayQuery(IWorkDayRepository workDayRepository)
        {
            this.Authorize();

            Field<WorkDayResponseType>("workDay")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
               {
                   var workDay = await workDayRepository.GetByIdAsync(context.GetArgument<Guid>("id"));

                   if (workDay == null)
                   {
                       context.Errors.Add(ErrorCode.WORK_DAY_NOT_FOUND);
                       return null;
                   }

                   return workDay;
               });
        }
    }
}
