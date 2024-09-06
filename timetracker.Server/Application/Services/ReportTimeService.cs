namespace timetracker.Server.Application.Services
{
    public static class ReportTimeService
    {
        public static TimeSpan CalculateMonthlyHours(TimeSpan time, int days)
        {
            return TimeSpan.FromHours(time.TotalHours * days);
        }

        public static double CalculatePercent(long totalTime, TimeSpan timeload)
        {
            if (timeload.TotalSeconds > 0)
                return totalTime / timeload.TotalSeconds * 100;
            return 0;
        }
    }
}