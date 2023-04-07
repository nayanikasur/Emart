using System.Data;
using System.Data.SqlClient;

namespace ecomdb
{
    public class DapperContext
    {
        public IDbConnection CreateConnection()
            => new SqlConnection("Server=SS-INN-014\\SQLEXPRESS;Database=Ecommerce;Trusted_Connection=true");

    }
}
