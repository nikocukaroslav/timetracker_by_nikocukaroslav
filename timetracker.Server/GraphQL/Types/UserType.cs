﻿using GraphQL.Types;
using timetracker.Server.Domain.Entities;

namespace timetracker.Server.GraphQL.Types
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.Password);
            Field(t => t.Permissions);
        }
    }
}