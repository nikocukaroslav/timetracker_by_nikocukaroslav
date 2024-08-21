namespace timetracker.Server.Domain.Entities
{
    public class TemporaryLink
    {
        public Guid Id { get; set; }
        public long ExpiresAt { get; set; }
        public Guid UserId { get; set; }
    }
}
