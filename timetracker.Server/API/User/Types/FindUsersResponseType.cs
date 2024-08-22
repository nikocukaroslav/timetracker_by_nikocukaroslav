using GraphQL.Types;
using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.User.Types
{
    public class FindUsersResponseType : ObjectGraphType<UserModel>
    {
        public FindUsersResponseType() {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
        }
    }
}
