using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JWT_Server.Security;
using JWT_Server.Model;

namespace JWT_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : BaseApiController
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody]AppUser user)
        {
            IActionResult result = null;
            AppUserAuth auth = new AppUserAuth();
            SecurityManager mgr = new SecurityManager();

            auth = mgr.ValidateUser(user);

            if (auth.IsAuthenticated)
            {
                result = StatusCode(StatusCodes.Status200OK, auth);
            }
            else
            {
                result = StatusCode(StatusCodes.Status404NotFound, "Invalid User Name/Password");
            }

            return result;
        }
    }
}