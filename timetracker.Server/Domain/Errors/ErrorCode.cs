using GraphQL;
using GraphQL.Validation;

namespace timetracker.Server.Domain.Errors
{
    public static class ErrorCode
    {
        public static readonly ValidationError UNAUTHORIZED = new Error("Authorization error");
        
        public static readonly ExecutionError INVALID_CREDENTIALS = new Error("Incorrect email or password");

        public static readonly ExecutionError INVALID_INPUT_DATA = new Error("Invalid data");

        public static readonly ExecutionError USER_NOT_FOUND = new Error("User not found");

        public static readonly ExecutionError EMAIL_EXIST = new Error("This email is already registered");

        public static readonly ExecutionError INVALID_PASSWORD_LENGTH = new Error("Password must be between 8 and 20 characters");

        public static readonly ExecutionError INVALID_EMAIL_FORMAT = new Error("Invalid email format");
    }

}
