namespace timetracker.Server.API.Role.Models
{
    public class UpdateRoleRequest
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public List<string>? DefaultPermissions { get; set; }
    }
}
