using System.Net;
using System.Net.Mail;
using timetracker.Server.Application.Interfaces;

namespace timetracker.Server.Application.Services
{
    public class EmailSender : IEmailSender
    {
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
    }
}
