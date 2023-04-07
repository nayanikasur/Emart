using ecomdb.Model;
using ecomdb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ecomdb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        private readonly CheckoutRepository checkoutRepository;

        public CheckoutController()
        {
            checkoutRepository = new CheckoutRepository();
        }

        [HttpGet("get-all")]
        public List<Checkout> GetAll()
        {
            return checkoutRepository.GetAll();
        }

        [HttpPost("create")]
        public bool Create([FromBody] Checkout user)
        {
            checkoutRepository.Add(user);
            return true;
        }

        [HttpGet("get-user")]
        public IActionResult GetByIdAll(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid user id");
            }

            return Ok(checkoutRepository.GetById(id));
        }

        [HttpPut("update")]
        public bool Update([FromBody] Checkout user)
        {
            Checkout savedCheckout = checkoutRepository.GetById(user.CustomerId);


            savedCheckout.Title = user.Title;
            savedCheckout.Email = user.Email;
            savedCheckout.FirstName = user.FirstName;
            savedCheckout.LastName = user.LastName;
            savedCheckout.PhoneNumber = user.PhoneNumber;
            savedCheckout.Extension = user.Extension;
            //savedCheckout.MobileNumber = user.MobileNumber;
            savedCheckout.Address = user.Address;

         
     
            checkoutRepository.Update(savedCheckout);
            return true;
        }

        [HttpDelete("delete")]
        public bool Delete(int id)
        {
            checkoutRepository.Delete(id);

            return true;
        }
    }
}

