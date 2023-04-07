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
    public class ContactController : ControllerBase
    {
        private readonly ContactRepository contactRepository;

        public ContactController()
        {
            contactRepository = new ContactRepository();
        }

        [HttpGet("get-all")]
        public IList<Contact> GetAll()
        {
            return contactRepository.GetAll();
        }

        [HttpPost("create")]
        public bool Create([FromBody] Contact user)
        {
            contactRepository.Add(user);
            return true;
        }

        [HttpGet("get-user")]
        public IActionResult GetByIdAll(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid user id");
            }

            return Ok(contactRepository.GetById(id));
        }

        [HttpPut("update")]
        public bool Update([FromBody] Contact user)
        {
            Contact savedCheckout = contactRepository.GetById(user.ContactId);

            savedCheckout.UserName = user.UserName;
            savedCheckout.email = user.email;
            savedCheckout.Purpose = user.Purpose;
            savedCheckout.YourMessage = user.YourMessage;

            contactRepository.Update(savedCheckout);
            return true;
        }

        [HttpDelete("delete")]
        public bool Delete(int id)
        {
            contactRepository.Delete(id);

            return true;
        }
    }
}

