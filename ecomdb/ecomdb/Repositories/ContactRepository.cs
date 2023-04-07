using ecomdb.Model;
using Dapper;
using Microsoft.AspNetCore.DataProtection.KeyManagement;

namespace ecomdb.Repositories
{
    public class ContactRepository
    {
        private readonly DapperContext dbContext;
        public ContactRepository()
        {
            dbContext = new DapperContext();
        }

        public List<Contact> GetAll()
        {
            string sqlQuery = "SELECT * FROM Contact";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Contact>(sqlQuery);
                return customers.ToList();
            }
        }

        public Contact GetById(int id)
        {
            string sqlQuery = "SELECT * FROM Contact WHERE ContactId=@ContactId";
            using (var connection = dbContext.CreateConnection())
            {
                var customer = connection.QuerySingleOrDefault<Contact>(sqlQuery, new { ContactId = id });
                return customer;
            }
        }

        public int Add(Contact check)
        {
            string sqlQuery = "INSERT INTO Contact(UserName,email,Purpose,YourMessage) Values (@UserName,@email,@Purpose,@YourMessage); SELECT SCOPE_IDENTITY(); ";
            using (var connection = dbContext.CreateConnection())
            {
                return connection.ExecuteScalar<int>(sqlQuery,
                    new
                    {
                        UserName = check.UserName,
                        email = check.email,
                        Purpose = check.Purpose,
                        YourMessage = check.YourMessage
                    }
                    );
            }
        }

        public bool Update(Contact user)
        {
            string sqlQuery = "Update Contact SET UserName=@UserName,email=@email,Purpose=@Purpose,YourMessage=@YourMessage WHERE ContactId=@ContactId;";
            using (var connection = dbContext.CreateConnection())
            {
                connection.Execute(sqlQuery,
                   new
                   {
                       ContactId = user.ContactId,
                       UserName = user.UserName,
                       email = user.email,
                       Purpose = user.Purpose,
                       YourMessage = user.YourMessage
                   }
                   );
            }
            return true;
        }

        public bool Delete(int id)
        {
            string sqlQuery = "DELETE FROM Contact WHERE ContactId=@ContactId";
            using (var connection = dbContext.CreateConnection())
            {
                connection.Execute(sqlQuery, new { ContactId = id });
            }
            return true;
        }
    }
}
