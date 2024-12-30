using GraphQL.DataLoader;
using GraphQL.Types;
using timetracker.Server.API.Role.Types;
using timetracker.Server.Application.Services;
using timetracker.Server.Domain.Models;
using timetracker.Server.Infrastructure.Interfaces;
using RoleModel = timetracker.Server.Domain.Entities.Role;

namespace timetracker.Server.API.User.Types
{
    public class UserMonthlyReportResponseType : ObjectGraphType<UserMonthlyReport>
    {
        public UserMonthlyReportResponseType(IRoleRepository roleRepository, IDataLoaderContextAccessor accessor)
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.TotalTime);

            Field<TimeSpanSecondsGraphType>("timeload")
                .Resolve(context =>
                    {
                        return ReportTimeService.CalculateMonthlyHours(context.Source.Timeload, 20);
                    }
                );

            Field<FloatGraphType>("percent")
                .Resolve(context =>
                    {
                        return (float)ReportTimeService.CalculatePercent(
                            context.Source.TotalTime,
                            ReportTimeService.CalculateMonthlyHours(context.Source.Timeload, 20)
                            );
                    }
                );

            Field<UserRoleResponseType, RoleModel>("role")
            .ResolveAsync(context =>
            {
                var loader = accessor.Context.GetOrAddBatchLoader<Guid?, RoleModel>("GetRolesByIdAsync", roleRepository.GetRolesByIdAsync);

                return loader.LoadAsync(context.Source.RoleId);
            });
        }
    }
}
