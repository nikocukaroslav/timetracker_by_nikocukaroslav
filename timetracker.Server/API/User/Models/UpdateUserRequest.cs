namespace timetracker.Server.API.User.Models
{
    public class UpdateUserRequest
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int? Timeload { get; set; }
        public string Position { get; set; }
        public string Status { get; set; }
        public List<string> Permissions { get; set; }
    }
}
