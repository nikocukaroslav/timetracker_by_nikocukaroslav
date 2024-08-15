namespace timetracker.Server.Application.Services
{
    public static class DateTimeFormatter
    {
        public static DateOnly DateTimeToDateOnly(DateTime date)
        {
            return DateOnly.FromDateTime(date);
        }
        public static DateTime DateOnlyToDateTime (DateOnly date)
        {
            return date.ToDateTime(TimeOnly.MinValue);
        }
        public static TimeOnly TimeSpanToTimeOnly(TimeSpan time) 
        {
            return TimeOnly.FromTimeSpan(time);
        }
    }
}