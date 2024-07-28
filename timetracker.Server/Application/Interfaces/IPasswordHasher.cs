using timetracker.Server.Application.Models;

namespace timetracker.Server.Application.Interfaces
{
    public interface IPasswordHasher
    {
        HashPasswordResponce HashPassword(string password);
        bool VerifyHash(string password, string hashedPassword, string salt);
    }

}
