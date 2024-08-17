    using GraphQL.Types;

    namespace timetracker.Server.API.User.Types
    {
        public class GetWorkDaysRequestType : InputObjectGraphType
        {
            public GetWorkDaysRequestType() 
            {
                Field<DateOnlyGraphType>("startDate");
                Field<DateOnlyGraphType>("endDate");
                Field<GuidGraphType>("userId");
            }
        }
    }
