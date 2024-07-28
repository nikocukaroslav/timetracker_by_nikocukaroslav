namespace timetracker.Server.Application.Services.Authentication
{
    public class PasswordHasherSettings
    {
        public int SaltBytesSize { get; set; }
        public int KeySize { get; set; }
        public int Iterations { get; set; }
    }

}
