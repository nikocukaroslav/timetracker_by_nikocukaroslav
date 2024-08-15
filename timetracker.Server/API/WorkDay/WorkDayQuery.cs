using GraphQL.Types;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;
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

            Field<ListGraphType<WorkDayResponseType>>("GetWorkDays")
               .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
               .ResolveAsync(async context =>
              {
                   var workDays = await workDayRepository
                   .GetUserWorkDaysByIdAsync(context.GetArgument<Guid>("id"));

                   if (workDays == null)
                   {
                       context.Errors.Add(ErrorCode.WORK_DAY_NOT_FOUND);
                       return null;
                   }

                   return workDays;
               });

            Field<WorkDayResponseType>("GetWorkDay")
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
