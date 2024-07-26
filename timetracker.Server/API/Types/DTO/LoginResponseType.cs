using GraphQL.Types;
using timetracker.Server.Domain.Entities;

namespace timetracker.Server.API.Types.DTO
{
    public class LoginResponseType : ObjectGraphType<Users>
    {
        public LoginResponseType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.EmployeeType);
            Field<ListGraphType<StringGraphType>>("permissions")
                .Resolve(context => context.Source.Permissions.Split(',').ToList());
        }
    }
}
