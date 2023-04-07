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
    public class PaymentController : ControllerBase
    {
        private readonly PaymentRepository paymentRepository;

        public PaymentController()
        {
            paymentRepository = new PaymentRepository();
        }

        [HttpGet("get-all")]
        public IList<Payment> GetAll()
        {
            return paymentRepository.GetAll();
        }

        [HttpPost("create")]
        public bool Create([FromBody] Payment user)
        {
            paymentRepository.Add(user);
            return true;
        }

        [HttpGet("get-user")]
        public IActionResult GetByIdAll(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid user id");
            }

            return Ok(paymentRepository.GetById(id));
        }

        [HttpPut("update")]
        public bool Update([FromBody] Payment user)
        {
            Payment savedCheckout = paymentRepository.GetById(user.PaymentId);


            savedCheckout.cardnumber = user.cardnumber;
            savedCheckout.cvv = user.cvv;
            savedCheckout.expdate = user.expdate;
            savedCheckout.nameofuser = user.nameofuser;



            paymentRepository.Update(savedCheckout);
            return true;
        }

        [HttpDelete("delete")]
        public bool Delete(int id)
        {
            paymentRepository.Delete(id);

            return true;
        }
    }
}

