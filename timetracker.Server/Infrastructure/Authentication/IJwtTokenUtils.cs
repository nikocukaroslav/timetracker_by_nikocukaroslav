namespace timetracker.Server.Infrastructure.Authentication
{
    public interface IJwtTokenUtils
    {
        string GenerateToken(Guid Id);
    }
}
