namespace timetracker.Server.API.WorkDay.Models
{
    public class AddWorkDaysRequest
    {
        public List<DateOnly> Days { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public Guid UserId { get; set; }
    }
}
