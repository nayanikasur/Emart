using System.ComponentModel.DataAnnotations;

namespace ecomdb.Model
{
    public class Ccart
    {

        public int cartid { get; set; }
        public List<Cartprodut> produtos { get; set; }  
        //public List<ProductList> productLists { get; set; }

    }
}