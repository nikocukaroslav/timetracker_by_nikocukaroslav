using GraphQL.Validation;

namespace timetracker.Server.Domain.Errors
{
    public static class ErrorCode
    {
        public static readonly ValidationError UNAUTHORIZED = new Error("Authorization error");
        
        public static readonly ValidationError INVALID_CREDENTIALS = new Error("Incorrect email or password");

        public static readonly ValidationError INVALID_INPUT_DATA = new Error("Invalid data");

        public static readonly ValidationError USER_NOT_FOUND = new Error("User is not found");

        public static readonly ValidationError ROLE_NOT_FOUND = new Error("Role is not found");

        public static readonly ValidationError WORK_SESSION_NOT_FOUND = new Error("Work session is not found");

        public static readonly ValidationError WORK_SESSION_ALREADY_STOPPED = new Error("Work session is already stopped");

        public static readonly ValidationError WORK_SESSION_IN_FUTURE = new Error("Work session cannot be set in the future");

        public static readonly ValidationError WORK_SESSION_TIME_CONFLICT = new Error("Work session time overlaps with an existing one");

        public static readonly ValidationError WORK_SESSION_TOO_LONG = new Error("Work session cannot be longer than 24 hours");

        public static readonly ValidationError INVALID_TIME_RANGE = new Error("End time cannot be earlier than start time");

        public static readonly ValidationError WORK_DAY_NOT_FOUND = new Error("Work day is not found");

        public static readonly ValidationError EMAIL_EXIST = new Error("This email is already registered");

        public static readonly ValidationError INVALID_PASSWORD_LENGTH = new Error("Password must be between 8 and 20 characters");

        public static readonly ValidationError INVALID_EMAIL_FORMAT = new Error("Invalid email format");

        public static readonly ValidationError ACCOUNT_SUSPENDED = new Error("Account suspended");

        public static readonly ValidationError LINK_NOT_CREATED = new Error("Link not created");

        public static readonly ValidationError LINK_EXPIRED = new Error("Link expired");

        public static readonly ValidationError LINK_NOT_FOUND = new Error("Link not found");

        public static readonly ValidationError INVALID_PAGINATION_SETTINGS = new Error("Invalid pagination settings");
    }

}
