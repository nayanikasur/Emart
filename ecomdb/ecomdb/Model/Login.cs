using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecomdb.DataModels
{
    public class Registration : Login
    {
        public string UName { get; set; } = String.Empty;

    }
    public class Login
    {
        public string EmailId { get; set; } = String.Empty;
        public string Pw { get; set; } = String.Empty;

    }
}

