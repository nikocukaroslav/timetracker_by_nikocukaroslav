namespace timetracker.Server.API.User.Models
{
    public class FilterRequest
    {
        public bool? IsEmployed { get; set; }
        public string? Status { get; set; }
        public string? Position { get; set; }
    }
}
