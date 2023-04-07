using System.ComponentModel.DataAnnotations;

namespace ecomdb.Model
{
    public class Checkout
    {
        public int CustomerId { get; set; }

        public string Title { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        //[MaxLength(10, ErrorMessage = "invalid mobile number")]
        //public string MobileNumber { get; set; }


        [MaxLength(10, ErrorMessage = "invalid Phone number")]
        public string PhoneNumber { get; set; }


        [MaxLength(3, ErrorMessage = "invalid Extension number")]
        public string Extension { get; set; }

        public string Address { get; set; }

    }
}
