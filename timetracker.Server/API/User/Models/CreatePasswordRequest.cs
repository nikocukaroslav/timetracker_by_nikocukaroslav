namespace timetracker.Server.API.User.Models
{
    public class CreatePasswordRequest
    {
        public Guid UserId { get; set; }
        public string Password { get; set; }
    }
}
