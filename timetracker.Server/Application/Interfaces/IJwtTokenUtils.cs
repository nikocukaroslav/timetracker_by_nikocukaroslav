namespace timetracker.Server.Application.Interfaces
{
    public interface IJwtTokenUtils
    {
        string GenerateToken(string Email);
    }
}
