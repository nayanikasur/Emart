using ecomdb;
using ecomdb.DataModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace ecomdb.Repository
{
    public class LoginRepository 
    {
        public string DoRegistration(Registration registration)
        {

            SqlConnection sql =(SqlConnection) new  DapperContext().CreateConnection();
            sql.Open();
            SqlCommand cmd = new SqlCommand("Insert into LoginPage (UserName,Pw,EmailId) values ('" + registration.UName + "','" + registration.Pw + "','" + registration.EmailId +  "')",sql);
            int i = cmd.ExecuteNonQuery();
            sql.Close();

            if (i > 0)
            {
                return "Data Inserted";
            }
            else
                return "Error";
        }

        public string DoLogin(Login login)
        {
            try
            {
                DataTable dt = new DataTable();
                SqlConnection sql = (SqlConnection)new DapperContext().CreateConnection();
                sql.Open();
                SqlCommand sd = new SqlCommand($"Select * from LoginPage WHERE  EmailId='" + login.EmailId + "' AND Pw = '" + login.Pw + "' ", sql);
                SqlDataAdapter adapter= new SqlDataAdapter(sd);
                adapter.Fill(dt);
                if (dt.Rows[0][2].Equals(login.Pw))
                {
                    return "succes";
                }
                else
                {
                    return "fail";
                }
                
            }
            catch (Exception ex)
            {
                return "failed";
            }
            

        }

    }
}