using timetracker.Server.Domain.Repositories;

namespace timetracker.Server.Domain.Entities
{
    public class Users
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? EmployeeType { get; set; }
        public string? Permissions { get; set; } = "";
    }
}
