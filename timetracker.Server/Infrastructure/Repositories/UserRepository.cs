using Dapper;
using timetracker.Server.API.Pagination.Models;
using timetracker.Server.API.User.Models;
using timetracker.Server.Application.Services;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Domain.Models;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<PaginatedList<User>> GetPaginatedUserListAsync(Pagination pagination, FilterUsers? filter, Sort? sort){
            using var connection = _connectionFactory.Create();

            var sqlQuery = new QueryBuilder("SELECT * FROM Users")
                .AddFilter("IsEmployed", filter?.IsEmployed)
                .AddFilter("Status", filter?.StatusList)
                .AddFilter("Position", filter?.PositionList)
                .AddSort(
                    sort?.SortBy ?? "Name",
                    sort?.Ascending ?? true
                )
                .AddPagination(pagination)
                .Create();

            var totalCount = await connection.ExecuteScalarAsync<int>(sqlQuery.TotalCountQuery, sqlQuery.Parameters);

            var users = await connection.QueryAsync<User>(sqlQuery.Query, sqlQuery.Parameters);

            return new PaginatedList<User>(users.ToList(), totalCount, pagination);
        }

        public async Task<string> GetUserPermissionsByEmailAsync(string email)
        {
            using var connection = _connectionFactory.Create();

            var permissions = await connection.QueryFirstOrDefaultAsync<string>(
                $"SELECT Permissions FROM {_tableName} WHERE Email = @Email",
                new { Email = email }
            );

            return permissions;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            using var connection = _connectionFactory.Create();

            var user = await connection.QueryFirstOrDefaultAsync<User>(
                $"Select * FROM {_tableName} WHERE Email = @Email",
                new { Email = email }
            );

            return user;
        }

        public async Task<IDictionary<Guid?, User>> GetUsersByIdAsync(IEnumerable<Guid?> ids)
        {
            using var connection = _connectionFactory.Create();

            var users = await connection.QueryAsync<User>(
                $"SELECT * FROM {_tableName} WHERE Id IN @Ids",
                new { Ids = ids }
            );

            return users.ToDictionary(x => (Guid?)x.Id);
        }

        public async Task<WorkSession> GetLastUserWorkSessionAsync(Guid id)
        {
            using var connection = _connectionFactory.Create();

            var workSession = await connection.QueryFirstOrDefaultAsync<WorkSession>(
                "SELECT * FROM WorkSessions WHERE UserId = @UserId AND EndTime IS NULL",
                new { UserId = id }
            );

            return workSession;
        }

        public async Task<List<WorkSession>> GetWorkSessionsByUserIdAsync(Guid id)
        {
            using var connection = _connectionFactory.Create();
            var query = "SELECT * FROM WorkSessions WHERE UserId = @UserId ORDER BY StartTime DESC";
            var workSessions = await connection.QueryAsync<WorkSession>(query, new { UserId = id });

            return workSessions.ToList();
        }

        public async Task<List<WorkDay>> GetWorkDaysByUserIdAsync(WorkDaysRequest workDaysRequest)
        {
            using var connection = _connectionFactory.Create();
            var query = "SELECT * FROM WorkDays WHERE UserId = @UserId AND Day BETWEEN @StartDate AND @EndDate";

            var workDays = await connection.QueryAsync<WorkDay>(query, new
            {
                UserId = workDaysRequest.UserId,
                StartDate = workDaysRequest.StartDate.ToDateTime(TimeOnly.MinValue),
                EndDate = workDaysRequest.EndDate.ToDateTime(TimeOnly.MaxValue)
            });

            return workDays.ToList();
        }

        public async Task<List<User>> FindUsersAsync(string input)
        {
            using var connection = _connectionFactory.Create();

            var parts = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            string name = parts.Length > 0 ? parts[0] : string.Empty;
            string surname = parts.Length > 1 ? parts[1] : string.Empty;

            var query = @"
                SELECT * FROM Users 
                WHERE (LOWER(Name) LIKE LOWER(@Name) AND LOWER(Surname) LIKE LOWER(@Surname))
                OR LOWER(Email) LIKE LOWER(@Name)
                OR LOWER(Name) LIKE LOWER(@FullName)
                OR LOWER(Surname) LIKE LOWER(@FullName)";

            var users = await connection.QueryAsync<User>(query, new
            {
                Name = $"%{name.ToLower()}%",
                Surname = $"%{surname.ToLower()}%",
                FullName = $"%{input.ToLower()}%"
            });

            return users.ToList();
        }

    }
}
