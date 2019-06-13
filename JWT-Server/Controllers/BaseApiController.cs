using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWT_Server.Controllers
{
    public class BaseApiController : Controller
    {
        protected IActionResult HandleException(Exception ex, string msg)
        {
            IActionResult result;

            // Create new exception with generic message        
            result = StatusCode(StatusCodes.Status500InternalServerError, new Exception(msg, ex));

            return result;
        }
    }
}