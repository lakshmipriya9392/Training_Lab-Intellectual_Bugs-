using Microsoft.AspNetCore.Mvc;
using TrainingLab.Models;
using TrainingLab.Services;
using System;

namespace TrainingLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
             
        //signup
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserModel userModel)
        {try
            {
                if (UserService.Instance.SignUp(userModel))
                {
                    return Ok(new
                    {
                        result = "True"
                    });
                }
                return Unauthorized(new
                {
                    result = "False",
                    message = "User with such email already exists!"
                });
            }
            catch (Exception e) { return Unauthorized(new { error = e }); }
        }

        //signin
        [HttpPost("login")]
        public IActionResult SignIn([FromBody] UserModel userModel)
        {
            try
            {
                bool result = UserService.Instance.SignIn(userModel);
                string userName = UserService.Instance.userName;
                UserService.Instance.userName = null;
                if (result == false)
                {
                    return Unauthorized(new
                    {
                        result = "False",
                        message = "Invalid Email or Password!"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        result = "True",
                        name = userName

                    });
                }
            }
            catch (Exception e) { return Unauthorized(new { error = e }); }
        }
    }
}