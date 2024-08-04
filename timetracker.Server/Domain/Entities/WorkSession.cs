using timetracker.Server.Domain.Attributes;

namespace timetracker.Server.Domain.Entities
{
    [TableName("WorkSessions")]
    public class WorkSession
    {
        public Guid Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string SetBy { get; set; } 
        public Guid? EditedBy { get; set; } 
        public DateTime? EditedAt { get; set; } 
        public Guid UserId { get; set; }
    }
}
