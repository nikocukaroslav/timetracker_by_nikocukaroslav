namespace timetracker.Server.API.User.Models
{
    public class FilterUsers
    {
        public bool? IsEmployed { get; set; }
        public List<string>? StatusList { get; set; }
        public List<string>? PositionList { get; set; }
    }
}
