namespace timetracker.Server.API.Role.Models
{
    public class CreateRoleRequest
    {
        public string Name { get; set; }
        public List<string>? DefaultPermissions { get; set; }
    }
}
