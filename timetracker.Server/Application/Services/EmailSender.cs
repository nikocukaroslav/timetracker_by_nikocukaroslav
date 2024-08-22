using System.Net;
using System.Net.Mail;
using timetracker.Server.Application.Interfaces;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Errors;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Application.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ITemporaryLinkRepository _temporaryLinkRepository;
        private readonly IConfiguration _configuration;
        public EmailSender(ITemporaryLinkRepository temporaryLinkRepository, IConfiguration configuration)
        {
            _temporaryLinkRepository = temporaryLinkRepository;
            _configuration = configuration;
        }
 
        public Task SendEmailAsync(string email, string subject, string message)
        {
            string fromEmail = "timetrackersana@gmail.com";
            string fromPassword = "ddss ldya nusv suzm";

            var client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential(fromEmail, fromPassword)
            };

            return client.SendMailAsync(
                new MailMessage(
                    from: fromEmail,
                    to: email,
                    subject,
                    message
                    )
                );
        }

        public async Task SendCreatePasswordEmailAsync(User createdUser)
        {
            var expires = DateTime.Now.AddDays(1);
            var expiresAtTimeStamp = new DateTimeOffset(expires).ToUnixTimeMilliseconds();

            var temporaryLink = new Domain.Entities.TemporaryLink()
            {
                ExpiresAt = expiresAtTimeStamp,
                UserId = createdUser.Id,
            };

            var temporaryLinkToSend = await _temporaryLinkRepository.CreateAsync(temporaryLink);

            await SendEmailAsync(createdUser.Email,
               $"Welcome to the company, {createdUser.Name}",
               $"Please, create your password: " +
               $"{_configuration.GetValue<string>("BaseUrl")}/auth/create-password/{temporaryLinkToSend.Id}");
        }
    }
}
