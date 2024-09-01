using GraphQL;
using GraphQL.Types;
using timetracker.Server.Domain.Enums;

namespace timetracker.Server.API.User.Types
{
    public class UpdateUserRequestType : InputObjectGraphType
    {
        public UpdateUserRequestType()
        {
            this.AuthorizeWithPolicy(Permission.MANAGE_USERS.ToString());

            Field<NonNullGraphType<GuidGraphType>>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("surname");
            Field<GuidGraphType>("roleId");
            Field<StringGraphType>("status");
            Field<TimeOnlyGraphType>("timeload");
            Field<ListGraphType<StringGraphType>>("permissions");
            Field<BooleanGraphType>("isEmployed");
        }
    }
}
