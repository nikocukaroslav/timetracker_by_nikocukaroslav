namespace timetracker.Server.Application.Interfaces
{
    public interface IPlanner
    {
        Task AddWorkSessions();
        void ScheduleRecurringJob();
    }
}
