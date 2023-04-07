using ecomdb.Model;
using Dapper;
using static System.Net.Mime.MediaTypeNames;
using ecomdb.DataModels;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace ecomdb.Repositories
{
    public class CartRepository
    {
        private readonly DapperContext dbContext;
        private ProductsRepository productsRepository;
        public CartRepository()
        {
            dbContext = new DapperContext();
            productsRepository = new ProductsRepository();
        }

        public Ccart GetAll(Login login)
        {
            try
            {
                List<Products> prodlist = productsRepository.GetAll();
                Ccart ccart = new Ccart();
                ccart.produtos = new List<Cartprodut>();
                string sqlQuery = "SELECT * FROM Cartnew where EmailId='" + login.EmailId + "'";
                SqlConnection con=(SqlConnection) dbContext.CreateConnection();
                con.Open();
                SqlCommand cmd = new SqlCommand(sqlQuery,con);
                var crtid =cmd.ExecuteScalar();
                var list =  con.Query<Productlist>("SELECT * FROM ProductLists WHERE cartid=" + crtid).ToList();
                ccart.cartid = Convert.ToInt32( crtid);
                List<IGrouping<int, Productlist>> grplist = list.GroupBy(u => u.productId).ToList();
                    foreach (var group in grplist)
                {
                    Cartprodut crtp= new Cartprodut();
                    crtp.cartid = ccart.cartid;
                    crtp.productId= group.Key;
                    foreach(var item in group)
                    {
                        crtp.quantity += 1;
                    }

                    var productprice = Convert.ToInt32(prodlist.Find(x => x.ProductId == group.Key).Price);
                    crtp.productname = prodlist.Find(x => x.ProductId == group.Key).Title;
                    crtp.productprice=productprice.ToString();
                    ccart.produtos.Add(crtp);

                    string addQuery = "INSERT INTO CartContent (productId,cartid,productname,productprice,quantity )VALUES('"+crtp.productId+"','"+crtp.cartid+"','"+crtp.productname+"','"+crtp.productprice+"','"+crtp.quantity+"')";
                    con.Query<Cartprodut>(addQuery);
                }
                con.Close();
                return ccart;

            }
            catch (Exception ex) 
            {
                SqlConnection con = (SqlConnection)dbContext.CreateConnection();
                con.Open();
                con.Query("INSERT INTO Ccart(EmalId) VALUES(" + login.EmailId + ")");
                return new Ccart();
            }
         }

        public string Add(Login login,Products prod)
        {
            try
            {
                string sqlQuery = "SELECT * FROM Cartnew where EmailId='" + login.EmailId+"'";
                SqlConnection con = (SqlConnection)dbContext.CreateConnection();
                con.Open();
                SqlCommand cmd = new SqlCommand(sqlQuery,con);
                var crtid = cmd.ExecuteScalar();
                
                //var crtid = cmd.ExecuteScalar();
                if (crtid != null)
                {
                    string q = "INSERT INTO ProductLists(productId,cartid) VALUES(" + prod.ProductId + "," + crtid + ");";
                    con.Query(q);
                    return "succes";
                    
                }
                else
                {
                    con.Query("INSERT INTO Cartnew(EmailId) VALUES('" + login.EmailId + "')");

                    crtid = cmd.ExecuteScalar();
                    con.Query("INSERT INTO ProductLists(productId,cartid) VALUES(" + prod.ProductId + "," + crtid + ");");
                    return "succes";
                }
                con.Close();
            }
            catch (Exception ex) 
            {
                string sqlQuery = "SELECT * FROM Cartnew where EmailId='" + login.EmailId + "'";

                SqlConnection con = (SqlConnection)dbContext.CreateConnection();
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();

                con.Query("INSERT INTO Cartnew(EmailId) VALUES('" + login.EmailId + "')");
               var crtid = cmd.ExecuteScalar();
                con.Query("INSERT INTO ProductLists(productId,cartid) VALUES('" + prod.ProductId + "',," + crtid + "');");
                con.Close();
                return "success";
            }
        }

        public string Delete(Login login,Products prod)
        {
            try
            {
                string sqlQuery = "SELECT * FROM Cartnew where EmailId='" + login.EmailId + "'";

                SqlConnection con = (SqlConnection)dbContext.CreateConnection();
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                var crtid = cmd.ExecuteScalar();
                List<Productlist > list = con.Query<Productlist>("SELECT * FROM ProductLists WHERE cartid=" + crtid).ToList();
                Productlist dprod = list.First(x => x.productId==prod.ProductId);
                 cmd = new SqlCommand("delete from ProductLists where slnno="+dprod.slnno, con);
                cmd.ExecuteNonQuery();

                con.Close();
                return "success";
            }
            catch(Exception ex) {
                return "fail";
            }

        }

        public string Deletecartitems (Login login)
        {
           try
            {
                string sqlQuery = "SELECT * FROM Cartnew where EmailId='" + login.EmailId + "'";
                SqlConnection con = (SqlConnection)dbContext.CreateConnection();
                con.Open();
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                var crtid = cmd.ExecuteScalar();
                con.Query("DELETE  FROM ProductLists WHERE cartid=" + crtid);
                con.Close();
                return "success";
            }
            catch(Exception EX)
            {
                return EX.Message;
            }
        }


    }
}