namespace timetracker.Server.Application.Services.Authentication
{
    public class PasswordHasherSettings
    {
        public string Salt { get; set; }
        public int KeySize { get; set; }
        public int Iterations { get; set; }
    }

}
