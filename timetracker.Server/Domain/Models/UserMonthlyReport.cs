namespace timetracker.Server.Domain.Models
{
    public class UserMonthlyReport
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public Guid RoleId { get; set; }
        public TimeSpan Timeload { get; set; }
        public long TotalTime { get; set; }
    }
}
