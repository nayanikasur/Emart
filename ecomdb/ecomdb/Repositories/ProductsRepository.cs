using ecomdb.Model;
using Dapper;
using Microsoft.AspNetCore.DataProtection.KeyManagement;

namespace ecomdb.Repositories
{
    public class ProductsRepository
    {
        private readonly DapperContext dbContext;
        public ProductsRepository()
        {
            dbContext = new DapperContext();
        }

        public List<Products> GetAll()
        {
            string sqlQuery = "SELECT * FROM Products ";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Products>(sqlQuery);
                return customers.ToList();
            }
        }
        public List<Products> GETELECTRONICS()
        {
            string sqlQuery = "SELECT * FROM Products WHERE Categoryid=4 ";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Products>(sqlQuery);
                return customers.ToList();
            }
        } public List<Products> GETMENSCLOTHING()
        {
            string sqlQuery = "SELECT * FROM Products WHERE Categoryid=1 ";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Products>(sqlQuery);
                return customers.ToList();
            }
        } public List<Products> GETWOMENSCLOTHING()
        {
            string sqlQuery = "SELECT * FROM Products WHERE Categoryid=2 ";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Products>(sqlQuery);
                return customers.ToList();
            }
        } public List<Products> JEWELLERY()
        {
            string sqlQuery = "SELECT * FROM Products WHERE Categoryid=3 ";
            using (var connection = dbContext.CreateConnection())
            {
                var customers = connection.Query<Products>(sqlQuery);
                return customers.ToList();
            }
        }
        public Products GetById(int id)
        {
            string sqlQuery = "SELECT * FROM Products WHERE ProductId=@ProductId";
            using (var connection = dbContext.CreateConnection())
            {
                var customer = connection.QuerySingleOrDefault<Products>(sqlQuery, new { ProductId = id });
                return customer;
            }
        }

        //public int Add(Products check)
        //{
        //    string sqlQuery = "INSERT INTO Products(Title,Price,Descriptions,Images, Rating,Quantity,Categoryid) Values (@Title,@Price,@Descriptions,@Images,@Rating,@Quantity,@Categoryid); SELECT SCOPE_IDENTITY(); ";
        //    using (var connection = dbContext.CreateConnection())
        //    {
        //        return connection.ExecuteScalar<int>(sqlQuery,
        //            new
        //            {
        //                Title = check.Title,
        //                Price = check.Price,
        //                Descriptions = check.Descriptions,
        //                Images = check.Images,
        //                Rating = check.Rating,
        //                Quantity = check.Quantity,
        //                Categoryid = check.Categoryid,
        //            }
        //            );
        //    }
        //}

        //public bool Update(Products check)
        //{
        //    string sqlQuery = "Update Products SET ProductId=@ProductId,Title=@Title,Price=@Price,Descriptions=@Descriptions,Images=@Images, Rating=@Rating,Quantity=@Quantity,Categoryid=@Categoryid WHERE ProductId=@ProductId;";
        //    using (var connection = dbContext.CreateConnection())
        //    {
        //        connection.Execute(sqlQuery,
        //           new
        //           {
        //               ProductId = check.ProductId,
        //               Title = check.Title,
        //               Price = check.Price,
        //               Descriptions = check.Descriptions,
        //               Images = check.Images,
        //               Rating = check.Rating,
        //               Quantity = check.Quantity,
        //               Categoryid = check.Categoryid,

        //           }
        //           );
        //    }
        //    return true;
        //}

        //public bool Delete(int id)
        //{
        //    string sqlQuery = "DELETE FROM Products WHERE ProductsId=@prodId";
        //    using (var connection = dbContext.CreateConnection())
        //    {
        //        connection.Execute(sqlQuery, new { prodId = id });
        //    }
        //    return true;
        //}
    }
}
