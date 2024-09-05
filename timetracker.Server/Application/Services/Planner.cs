using Hangfire;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Infrastructure.Interfaces;
using WorkSessionModel = timetracker.Server.Domain.Entities.WorkSession;


namespace timetracker.Server.Application.Services
{
    public class Planner : IPlanner
    {
        private readonly IWorkSessionRepository _workSessionRepository;
        private readonly IUserRepository _userRepository;

        public Planner(IUserRepository userRepository, IWorkSessionRepository workSessionRepository)
        {
            _workSessionRepository = workSessionRepository;
            _userRepository = userRepository;
        }
        public async Task AddWorkSessions()
        {
            var users = await _userRepository.GetAllAsync();

            foreach (var user in users)
            {
                if (!user.Permissions.Contains("MANAGE_OWN_TIME"))
                {
                    var timeload = user.Timeload;

                    var startTime = DateTime.Today.AddHours(8);

                    var startTimeUnixMilliseconds = new DateTimeOffset(startTime).ToUnixTimeMilliseconds();

                    var endTime = startTime.Add(timeload);

                    var newWorkSession = new WorkSessionModel()
                    {
                        StartTime = startTimeUnixMilliseconds,
                        EndTime = new DateTimeOffset(endTime).ToUnixTimeMilliseconds(),
                        UserId = user.Id,
                        SetBy = "SYSTEM",
                    };

                    await _workSessionRepository.CreateAsync(newWorkSession);
                }
            }
        }

        [Obsolete]
        public void ScheduleRecurringJob()
        {
            RecurringJob.AddOrUpdate(
                "add-work-session",
                () => AddWorkSessions(),
                "06 15 * * *",
                TimeZoneInfo.Local);
        }
    }
}
