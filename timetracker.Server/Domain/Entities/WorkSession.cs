using timetracker.Server.Domain.Attributes;

namespace timetracker.Server.Domain.Entities
{
    [TableName("WorkSessions")]
    public class WorkSession
    {
        public Guid Id { get; set; }
        public long StartTime { get; set; }
        public long? EndTime { get; set; }
        public string SetBy { get; set; } 
        public Guid? EditedById { get; set; } 
        public User? EditedBy { get; set; }
        public long? EditedAt { get; set; } 
        public Guid UserId { get; set; }
    }
}
