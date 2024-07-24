namespace timetracker.Server.Infrastructure.Authentication
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool VerifyHash(string password, string hashedPassword);
    }

}
