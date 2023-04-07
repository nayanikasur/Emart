using ecomdb.DataModels;
using ecomdb.Model;
using ecomdb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using static System.Net.Mime.MediaTypeNames;

namespace ecomdb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CcartController : ControllerBase
    {
        private readonly CartRepository cartRepository;

        public CcartController()
        {
            cartRepository = new CartRepository();
        }

        [HttpGet("get-all")]
        public Ccart GetAll([FromQuery] Login login)
        {
            return cartRepository.GetAll(login);
        }


        [HttpPost("Add")]
        public string Add(request Reqest)
        {

            return cartRepository.Add(Reqest.login, Reqest.products);
            
        }


        [HttpPost("delete")]
        public string Delete(request Reqest)
        {
            return cartRepository.Delete(Reqest.login,  Reqest.products);
            
        }

        [HttpPost("Deletecartitems")]
        public string Deletecartitems(Login Reqest)
        {
            return cartRepository.Deletecartitems(Reqest);
        }
    }
}