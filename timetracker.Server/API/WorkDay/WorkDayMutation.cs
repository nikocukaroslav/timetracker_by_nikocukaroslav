using GraphQL;
using GraphQL.Types;
using timetracker.Server.API.WorkDay.Models;
using timetracker.Server.API.WorkDay.Types;
using timetracker.Server.Application.Services;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;

namespace timetracker.Server.API.WorkDay
{
    public class WorkDayMutation : ObjectGraphType
    {
        public WorkDayMutation(IRepository<WorkDayModel> workDayRepository)
        {
            this.Authorize();

            Field<ListGraphType<CreateWorkDaysResponseType>>("createWorkDays")
                .Arguments(new QueryArguments(
                    new QueryArgument<CreateWorkDaysRequestType> { Name = "workDays" }
                ))
                .ResolveAsync(async context =>
                {
                    var workDaysInput = context.GetArgument<CreateWorkDaysRequest>("workDays");

                    var addedWorkDays = new List<WorkDayModel>();

                        foreach (var day in workDaysInput.Days)
                        {
                            var workDay = new WorkDayModel
                            {
                                Day = DateTimeFormatter.DateOnlyToDateTime(day),
                                StartTime = workDaysInput.StartTime.ToTimeSpan(),
                                EndTime = workDaysInput.EndTime.ToTimeSpan(),
                                UserId = workDaysInput.UserId
                            };

                            var addedWorkDay = await workDayRepository.CreateAsync(workDay);
                            addedWorkDays.Add(addedWorkDay);
                        }
     
                    return addedWorkDays;
                });

            Field<WorkDayResponseType>("updateWorkDay")
                .Arguments(new QueryArguments(new QueryArgument<UpdateWorkDayRequestType> { Name = "workDay" }))
                .ResolveAsync(async context =>
                {
                    var inputWorkDay = context.GetArgument<UpdateWorkDayRequest>("workDay");
                    var workDay = await workDayRepository.GetByIdAsync(inputWorkDay.Id);

                    if (workDay == null)
                    {
                        context.Errors.Add(ErrorCode.WORK_DAY_NOT_FOUND);
                        return null;
                    }

                    workDay.Day = DateTimeFormatter.DateOnlyToDateTime(inputWorkDay.Day);
                    workDay.StartTime = inputWorkDay.StartTime.ToTimeSpan();
                    workDay.EndTime = inputWorkDay.EndTime.ToTimeSpan();

                    return await workDayRepository.UpdateAsync(workDay);
                });

            Field<BooleanGraphType>("deleteWorkDay")
                 .Arguments(new QueryArguments(new QueryArgument<GuidGraphType> { Name = "id" }))
                 .ResolveAsync(async context =>
                 {
                     Guid id = context.GetArgument<Guid>("id");
                     var workDay = await workDayRepository.GetByIdAsync(id);

                     if (workDay == null)
                     {
                         context.Errors.Add(ErrorCode.WORK_DAY_NOT_FOUND);
                         return null;
                     }

                     await workDayRepository.DeleteAsync(id);

                     return true;
                 });
        }
    }
}
