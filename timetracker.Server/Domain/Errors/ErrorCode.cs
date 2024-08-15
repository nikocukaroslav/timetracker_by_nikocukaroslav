﻿using GraphQL.Validation;

namespace timetracker.Server.Domain.Errors
{
    public static class ErrorCode
    {
        public static readonly ValidationError UNAUTHORIZED = new Error("Authorization error");
        
        public static readonly ValidationError INVALID_CREDENTIALS = new Error("Incorrect email or password");

        public static readonly ValidationError INVALID_INPUT_DATA = new Error("Invalid data");

        public static readonly ValidationError USER_NOT_FOUND = new Error("User is not found");

        public static readonly ValidationError WORK_SESSION_NOT_FOUND = new Error("Work session is not found");

        public static readonly ValidationError WORK_SESSION_ALREADY_STOPPED = new Error("Work session is already stopped");

        public static readonly ValidationError WORK_DAY_NOT_FOUND = new Error("Work day is not found");

        public static readonly ValidationError EMAIL_EXIST = new Error("This email is already registered");

        public static readonly ValidationError INVALID_PASSWORD_LENGTH = new Error("Password must be between 8 and 20 characters");

        public static readonly ValidationError INVALID_EMAIL_FORMAT = new Error("Invalid email format");

        public static readonly ValidationError ACCOUNT_SUSPENDED = new Error("Account suspended");
    }

}
