using System.Numerics;

namespace timetracker.Server.Application.Services
{
    public class TimeFormatter
    {
        public string FormatTime(int timeload)
        {
            var workDay = 8;

            var totalTime = workDay * (timeload / 100);

            return totalTime.ToString();
        }
    }
}