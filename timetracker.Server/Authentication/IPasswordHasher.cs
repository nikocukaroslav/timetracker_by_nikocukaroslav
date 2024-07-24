namespace timetracker.Server.Authentication
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool VerifyHash(string password, string hashedPassword);
    }

}
