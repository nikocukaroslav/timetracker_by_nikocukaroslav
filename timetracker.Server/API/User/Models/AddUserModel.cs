namespace timetracker.Server.API.User.Models
{
    public class AddUserModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string EmployeeType { get; set; } = "";
        public List<string> Permissions { get; set; }
    }
}
