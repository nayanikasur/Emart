using System.ComponentModel.DataAnnotations;

namespace ecomdb.Model
{
    public class Contact
    {
        public int ContactId { get; set; }
        public string UserName { get; set; }
        public string email { get; set; }
        public string Purpose { get; set; }
        public string YourMessage { get; set; }
    }
}
