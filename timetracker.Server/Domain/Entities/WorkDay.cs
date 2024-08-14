using timetracker.Server.Domain.Attributes;

namespace timetracker.Server.Domain.Entities
{
    [TableName("WorkDays")]
    public class WorkDay
    {
        public Guid Id { get; set; }
        public DateTime  Day { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public Guid UserId { get; set; }
    }
}
