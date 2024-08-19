namespace timetracker.Server.Domain.Models
{
    public class Filter
    {
        public bool? IsEmployed { get; set; }
        public List<string>? StatusList { get; set; }
        public List<string>? PositionList { get; set; }
    }
}
