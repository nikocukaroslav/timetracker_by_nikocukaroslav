using Dapper;
using timetracker.Server.API.Pagination.Models;
using timetracker.Server.API.User.Models;
using timetracker.Server.Domain.Entities;
using timetracker.Server.Infrastructure.Database;
using timetracker.Server.Infrastructure.Interfaces;

namespace timetracker.Server.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ISqlConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
        public async Task<PaginatedList<User>> GetPaginatedUserListAsync(int page,
            int pageSize, FilterRequest? filter)
        {
            using var connection = _connectionFactory.Create();

            var totalCountQuery = @"SELECT COUNT(*) FROM Users";

            var query = @"SELECT * FROM Users";

            var whereConditions = new List<string>();

            if (filter != null)
            {
                if (filter.IsEmployed != null) whereConditions.Add("IsEmployed = @IsEmployed");
                if (filter.Status != null) whereConditions.Add("Status = @Status");
                if (filter.Position != null) whereConditions.Add("Position = @Position");
            }

            if (whereConditions.Any())
            {
                var whereClause = " WHERE " + string.Join(" AND ", whereConditions);
                totalCountQuery += whereClause;
                query += whereClause;
            }

            query += " ORDER BY Name OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

            var totalCount = await connection.ExecuteScalarAsync<int>(totalCountQuery,filter);

            var users = await connection.QueryAsync<User>(query, new
            {
                Offset = (page - 1) * pageSize,
                PageSize = pageSize,
                IsEmployed = filter.IsEmployed,
                Status = filter.Status,
                Position = filter.Position,
            });

            return new PaginatedList<User>(users.ToList(), totalCount, page, pageSize);
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
    }
}
