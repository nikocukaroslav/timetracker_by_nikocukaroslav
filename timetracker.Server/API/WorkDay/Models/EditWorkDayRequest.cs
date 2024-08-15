namespace timetracker.Server.API.WorkDay.Models
{
    public class EditWorkDayRequest
    {
        public Guid Id { get; set; }
        public DateOnly Day { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public Guid UserId { get; set; }
    }
}
