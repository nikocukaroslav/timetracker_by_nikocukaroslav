using timetracker.Server.Domain.Entities;

namespace timetracker.Server.Application.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task SendCreatePasswordEmailAsync(User createdUser);
    }
}
