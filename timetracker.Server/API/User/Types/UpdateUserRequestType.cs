using GraphQL;
using GraphQL.Types;
using timetracker.Server.Domain.Enums;

namespace timetracker.Server.API.User.Types
{
    public class UpdateUserRequestType : InputObjectGraphType
    {
        public UpdateUserRequestType()
        {
            this.AuthorizeWithPolicy(Permissions.MANAGE_USERS.ToString());
            Field<GuidGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("surname");
            Field<StringGraphType>("position");
            Field<IntGraphType>("timeload");
            Field<ListGraphType<StringGraphType>>("permissions");
        }
    }
}
