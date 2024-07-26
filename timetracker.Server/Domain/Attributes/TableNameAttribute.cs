namespace timetracker.Server.Domain.Attributes
{
    public class TableNameAttribute : Attribute
    {
        public string TableName { get; init; }

        public TableNameAttribute(string tableName)
        {
            TableName = tableName;
        }
    }
}
