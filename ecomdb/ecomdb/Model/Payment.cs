using System.ComponentModel.DataAnnotations;

namespace ecomdb.Model
{
    public class Payment
    {
        public int PaymentId { get; set; }

        [MaxLength(16, ErrorMessage = "invalid cardnumber number")]
        public string cardnumber { get; set; }


        [MaxLength(3, ErrorMessage = "invalid cvv number")]
        public string cvv { get; set; }

        public string expdate { get; set; }

        public string nameofuser { get; set; }


    }
}
