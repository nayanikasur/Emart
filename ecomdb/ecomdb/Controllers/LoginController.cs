using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ecomdb.DataModels;

using ecomdb;
using ecomdb.Repository;

namespace ecomdb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly LoginRepository loginRepository;
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
            loginRepository= new LoginRepository ();
        }
        [HttpPost]
        [Route("RegisterHere")]
        public async Task<ActionResult<List<Registration>>> Registrations(Registration registratiion)
        {
            var res = loginRepository.DoRegistration(registratiion);
            return Ok(res);

        }

        [HttpPost]
        [Route("LoginHere")]
        public async Task<ActionResult<List<Login>>> Login(Login login)
        {
            LoginRepository registrationbl = new LoginRepository();
            var res = registrationbl.DoLogin(login);
            return Ok(res);

        }

    }
}