using System;
using System.Collections.Generic;
using System.Linq;
using JWT_Server.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWT_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseApiController
    {
        [HttpGet]
        public IActionResult Get()
        {
            IActionResult ret = null;
            List<Category> list = new List<Category>();

            try
            {
                using (var db = new JwtDbContext())
                {
                    if (db.Categories.Count() > 0)
                    {
                        // NOTE: Declare 'list' outside the using to avoid 
                        // it being disposed before it is returned.
                        list = db.Categories.OrderBy(p => p.CategoryName).ToList();
                        ret = StatusCode(StatusCodes.Status200OK, list);
                    }
                    else
                    {
                        ret = StatusCode(StatusCodes.Status404NotFound,
                                       "Can't Find Categories");
                    }
                }
            }
            catch (Exception ex)
            {
                ret = HandleException(ex,
                     "Exception trying to get all Categories");
            }

            return ret;
        }
    }
}