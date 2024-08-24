using System.Text.RegularExpressions;

namespace timetracker.Server.Application.Services
{
    public static class DataValidator
    {
        public static bool IsEmailValid(string email)
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return emailRegex.IsMatch(email);
        }

        public static bool IsPasswordValid(string password)
        {
            return !(password is null || password.Length < 8 || password.Length > 20);
        }

        public static bool IsTimeInFuture(long? time)
        {
            return time > new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds();
        }

        public static bool IsSessionDurationValid(long startTime, long? endTime)
        {
            if (endTime == null) return true;

            long sessionDurationInMilliseconds = endTime.Value - startTime;
            var sessionDuration = TimeSpan.FromMilliseconds(sessionDurationInMilliseconds);

            return sessionDuration.TotalHours >= 24;
        }
    }
}
