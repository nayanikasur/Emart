using ecomdb.Model;
using Dapper;
using Microsoft.AspNetCore.DataProtection.KeyManagement;

namespace ecomdb.Repositories
{
    public class PaymentRepository
    {
        private readonly DapperContext dbContext;
        public PaymentRepository()
        {
            dbContext = new DapperContext();
        }

        public List<Payment> GetAll()
        {
            string sqlQuery = "SELECT * FROM Payment";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Payment>(sqlQuery);
                return customers.ToList();
            }
        }

        public Payment GetById(int id)
        {
            string sqlQuery = "SELECT * FROM Pyament WHERE PaymentId=@PaymentId";
            using (var connection = dbContext.CreateConnection())
            {
                var customer = connection.QuerySingleOrDefault<Payment>(sqlQuery, new { PaymentId = id });
                return customer;
            }
        }

        public int Add(Payment check)
        {
            string sqlQuery = "INSERT INTO Payment(cardnumber,cvv,expdate,nameofuser) Values (@cardnumber,@cvv,@expdate,@nameofuser); SELECT SCOPE_IDENTITY(); ";
            using (var connection = dbContext.CreateConnection())
            {
                return connection.ExecuteScalar<int>(sqlQuery,
                    new
                    {
                        cardnumber = check.cardnumber,
                        cvv = check.cvv,
                        expdate = check.expdate,
                        nameofuser = check.nameofuser,
                    }
                    );
            }
        }

        public bool Update(Payment user)
        {
            string sqlQuery = "Update Payment SET cardnumber=@cardnumber,cvv=@cvv,expdate=@expdate,nameofuser=@nameofuser WHERE PaymentId=@PaymentId;";
            using (var connection = dbContext.CreateConnection())
            {
                connection.Execute(sqlQuery,
                   new
                   {
                       PaymentId = user.PaymentId,
                       cardnumber = user.cardnumber,
                       cvv = user.cvv,
                       expdate = user.expdate,
                       nameofuser = user.nameofuser,

                   }
                   );
            }
            return true;
        }

        public bool Delete(int id)
        {
            string sqlQuery = "DELETE FROM Payment WHERE PaymentId=@PaymentId";
            using (var connection = dbContext.CreateConnection())
            {
                connection.Execute(sqlQuery, new { PaymentId = id });
            }
            return true;
        }
    }
}
