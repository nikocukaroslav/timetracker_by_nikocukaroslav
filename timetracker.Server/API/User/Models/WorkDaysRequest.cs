namespace timetracker.Server.API.User.Models
{
    public class WorkDaysRequest
    {
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public Guid UserId { get; set; }
    }
}
