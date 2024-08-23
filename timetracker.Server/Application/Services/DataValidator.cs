namespace timetracker.Server.Application.Services
{
    public static class DataValidator
    {
        public static bool ValidateEmail(string email)
        {
            var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return emailRegex.IsMatch(email);
        }

        public static bool ValidatePassword(string password)
        {
            return !(password is null || password.Length < 8 || password.Length > 20);
        }
    }
}
