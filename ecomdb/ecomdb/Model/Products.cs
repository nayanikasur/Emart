using System.ComponentModel.DataAnnotations;

namespace ecomdb.Model
{
    public class Products
    {
        public int ProductId { get; set; }

        public string Title { get; set; }

        public double Price { get; set; }

        public string Descriptions { get; set; }

        public string Images { get; set; }
        public double Rating { get; set; }

        public string Quantity { get; set; }

        public string Categoryid { get; set; }


    }
}