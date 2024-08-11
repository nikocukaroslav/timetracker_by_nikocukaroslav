namespace timetracker.Server.API.User.Models
{
    public class AddUserRequest
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public float Timeload { get; set; }
        public string Position { get; set; }
        public List<string> Permissions { get; set; }
    }
}
