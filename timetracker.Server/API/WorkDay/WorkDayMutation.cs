using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkDay.Types;
using timetracker.Server.Infrastructure.Interfaces;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;

namespace timetracker.Server.API.WorkDay
{
    public class WorkDayMutation : ObjectGraphType
    {
        public WorkDayMutation(IRepository<WorkDayModel> workDayRepository)
        {
            this.Authorize();

            Field<AddWorkDayResponseType>("AddWorkDay")
                .Arguments(new QueryArguments(new QueryArgument<AddWorkDayRequestType> { Name = "workDay" }
                )).ResolveAsync(async context =>
                {
                    var inputWorkDay = context.GetArgument<WorkDayModel>("workDay");

                    return await workDayRepository.AddAsync(inputWorkDay);
                });

            Field<WorkDayResponseType>("EditWorkDay")
                .Arguments(new QueryArguments(new QueryArgument<EditWorkDayRequestType> { Name = "workDay" }))
                .ResolveAsync(async context =>
                {
                    var inputWorkDay = context.GetArgument<WorkDayModel>("workDay");
                    var workDay = await workDayRepository.GetByIdAsync(inputWorkDay.Id);

                    workDay.Day = inputWorkDay.Day;
                    workDay.StartTime = inputWorkDay.StartTime;
                    workDay.EndTime = inputWorkDay.EndTime;

                    return await workDayRepository.UpdateAsync(workDay);
                });

            Field<BooleanGraphType>("DeleteWorkDay")
                 .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                 .ResolveAsync(async context =>
                 {
                     Guid id = context.GetArgument<Guid>("id");
                     var workSession = await workDayRepository.GetByIdAsync(id);

                     await workDayRepository.DeleteAsync(id);

                     return true;
                 });
        }
    }
}
