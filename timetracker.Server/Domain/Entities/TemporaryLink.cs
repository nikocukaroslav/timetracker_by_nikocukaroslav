using timetracker.Server.Domain.Attributes;

namespace timetracker.Server.Domain.Entities
{
    [TableName("TemporaryLinks")]
    public class TemporaryLink
    {
        public Guid Id { get; set; }
        public long ExpiresAt { get; set; }
        public Guid UserId { get; set; }
    }
}
