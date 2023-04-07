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
    public class ProductsController : ControllerBase
    {
        private readonly ProductsRepository productsRepository;

        public ProductsController()
        {
            productsRepository = new ProductsRepository();
        }

        [HttpGet("get-all")]
        public IList<Products> GetAll()
        {
            return productsRepository.GetAll();
        }

        [HttpGet("electronics")]
        public IList<Products> GETELECTRONICS()
        {
            return productsRepository.GetAll();
        }

        //[HttpPost("create")]
        //public bool Create([FromBody] Products user)
        //{
        //    productsRepository.Add(user);
        //    return true;
        //}

        [HttpGet("get-user")]
        public IActionResult GetByIdAll(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid user id");
            }

            return Ok(productsRepository.GetById(id));
        }

        //[HttpPut("update")]
        //public bool Update([FromBody] Products user)
        //{
        //    Products savedCheckout = productsRepository.GetById(user.ProductId);

        //    savedCheckout.Title = user.Title;
        //    savedCheckout.Price = user.Price;
        //    savedCheckout.Descriptions = user.Descriptions;
        //    savedCheckout.Images = user.Images;
        //    savedCheckout.Rating = user.Rating;
        //    savedCheckout.Quantity = user.Quantity;
        //    savedCheckout.Categoryid = user.Categoryid;




        //    productsRepository.Update(savedCheckout);
        //    return true;
        //}

        //[HttpDelete("delete")]
        //public bool Delete(int id)
        //{
        //    productsRepository.Delete(id);

        //    return true;
        //}
    }
}

