using timetracker.Server.Domain.Attributes;

namespace timetracker.Server.Domain.Entities
{
    [TableName("Roles")]
    public class Role
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? DefaultPermissions { get; set; }
    }
}
