using GraphQL.Types;
using timetracker.Server.Domain.Entities;

namespace timetracker.Server.API.Types
{
    public class UserType : ObjectGraphType<Users>
    {
        public UserType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.Password);
            Field(t => t.EmployeeType);
            Field(t => t.Permissions);
        }
    }
}
