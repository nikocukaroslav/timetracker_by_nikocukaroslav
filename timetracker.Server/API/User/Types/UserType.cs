using GraphQL.Types;
using UserModel = timetracker.Server.Domain.Entities.User;

namespace timetracker.Server.API.User.Types
{
    public class UserType : ObjectGraphType<UserModel>
    {
        public UserType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.EmployeeType);
            Field<ListGraphType<StringGraphType>>("permissions")
               .Resolve(context => context.Source.Permissions.Split(',').ToList());
        }
    }
}
