using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWT_Sever.Controllers
{
    public class BaseApiController : ControllerBase
    {
        protected IActionResult HandleException(Exception ex, string msg)
        {
            IActionResult result;

            result = StatusCode(StatusCodes.Status500InternalServerError, new Exception(msg, ex));

            return result;
        }
    }
}
