namespace timetracker.Server.API.WorkDay.Models
{
    public class EditWorkDayRequest
    {
        public Guid Id { get; set; }
        public DateOnly Day { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public Guid UserId { get; set; }
    }
}
