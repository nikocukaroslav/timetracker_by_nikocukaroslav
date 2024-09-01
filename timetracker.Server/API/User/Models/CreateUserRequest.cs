namespace timetracker.Server.API.User.Models
{
    public class CreateUserRequest
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public TimeOnly Timeload { get; set; }
        public Guid RoleId { get; set; }
        public List<string> Permissions { get; set; }
    }
}
