namespace timetracker.Server.API.WorkDay.Models
{
    public class AddWorkDaysRequest
    {
        public List<DateOnly> Days { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public Guid UserId { get; set; }
    }
}
