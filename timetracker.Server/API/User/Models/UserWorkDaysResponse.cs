using UserModel = timetracker.Server.Domain.Entities.User;
using WorkDayModel = timetracker.Server.Domain.Entities.WorkDay;
namespace timetracker.Server.API.User.Models
{
    public class UserWorkDaysResponse
    {
        public List<WorkDayModel> Days { get; set; }
        public UserModel User { get; set; }
        public Guid UserId { get; set; }
    }
}
