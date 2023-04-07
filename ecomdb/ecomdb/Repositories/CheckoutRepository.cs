using ecomdb.Model;
using Dapper;
namespace ecomdb.Repositories
{
    public class CheckoutRepository
    {
        private readonly DapperContext dbContext;
        public CheckoutRepository()
        {
            dbContext = new DapperContext();
        }

        public List<Checkout> GetAll()
        {
            string sqlQuery = "SELECT * FROM CustomerDetails";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Checkout>(sqlQuery);
                return customers.ToList();
            }
        }

        public Checkout GetById(int id)
        {
            string sqlQuery = "SELECT * FROM CustomerDetails WHERE CustomerId=@CustomerId";
            using (var connection = dbContext.CreateConnection())
            {
                var customer = connection.QuerySingleOrDefault<Checkout>(sqlQuery, new { CustomerId = id });
                return customer;
            }
        }

        public int Add(Checkout check)
        {
            string sqlQuery = "INSERT INTO CustomerDetails(Title,Email,FirstName,LastName,PhoneNumber,Extension,ADDRESSS) Values (@Title, @Email, @FirstName, @LastName, @PhoneNumber, @Extension, @Address); SELECT SCOPE_IDENTITY(); ";
            using (var connection = dbContext.CreateConnection())
            {
                return connection.ExecuteScalar<int>(sqlQuery,
                    new
                    {

                        Title = check.Title,
                        Email = check.Email,
                        FirstName = check.FirstName,
                        LastName = check.LastName,
                        PhoneNumber = check.PhoneNumber,
                        Extension = check.Extension,
                        //MobileNumber = check.MobileNumber,
                        Address = check.Address,
                    }
                    );
            }
        }

        public bool Update(Checkout user)
        {
            string sqlQuery = "Update CustomerDetails SET CustomerId=@CustomerId, Title=@Title, Email=@Email, FirstName=@FirstName, LastName=@LastName, PhoneNumber=@PhoneNumber, Extension=@Extension, ADDRESSS=@ADDRESSS WHERE CustomerId=@CustomerId;";
            using (var connection = dbContext.CreateConnection())
            {
                connection.Execute(sqlQuery,
                   new
                   {
                       CustomerId = user.CustomerId,
                       Title = user.Title,
                       Email = user.Email,
                       FirstName = user.FirstName,
                       LastName = user.LastName,
                       PhoneNumber = user.PhoneNumber,
                       Extension = user.Extension,
                       //MobileNumber = user.MobileNumber,
                       Address = user.Address,
                   }
                   );
            }
            return true;
        }

        public bool Delete(int id)
        {
            string sqlQuery = "DELETE FROM CustomerDetails WHERE CustomerId=@CustomerId";
            using (var connection = dbContext.CreateConnection())
            {
                connection.Execute(sqlQuery, new { CustomerId = id });
            }
            return true;
        }
    }
}
