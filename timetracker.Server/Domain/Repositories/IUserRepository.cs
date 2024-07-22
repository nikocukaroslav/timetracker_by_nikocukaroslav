namespace timetracker.Server.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<string> GetPermissions(Guid id);
    }
}
