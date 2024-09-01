namespace timetracker.Server.Domain.Models
{
    public class FilterUsers
    {
        public bool? IsEmployed { get; set; }
        public List<string>? StatusList { get; set; }
        public List<Guid>? RoleList { get; set; }
    }
}
