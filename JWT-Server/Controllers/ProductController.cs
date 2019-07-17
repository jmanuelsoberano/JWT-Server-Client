using System;
using System.Collections.Generic;
using System.Linq;
using JWT_Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWT_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : BaseApiController
    {
        [HttpGet]
        [Authorize(Policy = "CanAccessProducts")]
        public IActionResult Get()
        {
            IActionResult ret = null;
            List<Product> list = new List<Product>();

            try
            {
                using (var db = new JwtDbContext())
                {
                    if (db.Products.Count() > 0)
                    {
                        list = db.Products.OrderBy(p => p.ProductName).ToList();
                        ret = StatusCode(StatusCodes.Status200OK, list);
                    }
                    else
                    {
                        ret = StatusCode(StatusCodes.Status404NotFound, "Can't Find Products");
                    }
                }
            }
            catch (Exception ex)
            {
                ret = HandleException(ex, "Exception trying to get all products");
            }

            return ret;
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            IActionResult ret = null;
            Product entity = null;

            try
            {
                using (var db = new JwtDbContext())
                {
                    entity = db.Products.Find(id);
                    if (entity != null)
                    {
                        ret = StatusCode(StatusCodes.Status200OK, entity);
                    }
                    else
                    {
                        ret = StatusCode(StatusCodes.Status404NotFound,
                                 "Can't Find Product: " + id.ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                ret = HandleException(ex,
                  "Exception trying to retrieve a single product.");
            }

            return ret;
        }

        [HttpPost()]
        public IActionResult Post([FromBody]Product entity)
        {
            IActionResult ret = null;

            try
            {
                using (var db = new JwtDbContext())
                {
                    if (entity != null)
                    {
                        db.Products.Add(entity);
                        db.SaveChanges();
                        ret = StatusCode(StatusCodes.Status201Created,
                            entity);
                    }
                    else
                    {
                        ret = StatusCode(StatusCodes.Status400BadRequest, "Invalid object passed to POST method");
                    }
                }
            }
            catch (Exception ex)
            {
                ret = HandleException(ex, "Exception trying to insert a new product");
            }

            return ret;
        }

        [HttpPut()]
        public IActionResult Put([FromBody]Product entity)
        {
            IActionResult ret = null;

            try
            {
                using (var db = new JwtDbContext())
                {
                    if (entity != null)
                    {
                        db.Update(entity);
                        db.SaveChanges();
                        ret = StatusCode(StatusCodes.Status200OK, entity);
                    }
                    else
                    {
                        ret = StatusCode(StatusCodes.Status400BadRequest, "Invalid object passed to PUT method");
                    }
                }
            }
            catch (Exception ex)
            {
                ret = HandleException(ex, "Exception trying to update product: " + entity.ProductId.ToString());
            }

            return ret;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IActionResult ret = null;
            Product entity = null;

            try
            {
                using (var db = new JwtDbContext())
                {
                    entity = db.Products.Find(id);
                    if (entity != null)
                    {
                        db.Products.Remove(entity);
                        db.SaveChanges();
                    }
                    ret = StatusCode(StatusCodes.Status200OK, true);
                }
            }
            catch (Exception ex)
            {
                ret = HandleException(ex, "Exception trying to delete product: " + id.ToString());
            }

            return ret;
        }

    }
}