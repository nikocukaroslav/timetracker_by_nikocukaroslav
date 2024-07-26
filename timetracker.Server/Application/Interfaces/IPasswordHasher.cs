namespace timetracker.Server.Application.Interfaces
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool VerifyHash(string password, string hashedPassword);
    }

}
