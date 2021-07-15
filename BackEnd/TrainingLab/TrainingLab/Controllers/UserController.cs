using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SQLite;
using Microsoft.AspNetCore.Authorization;
using TrainingLab.Models;
using System.Text;
using TrainingLab.Services;
using Microsoft.Extensions.Configuration;
using System;

namespace TrainingLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
             
        //signup
        [HttpPost]
        [Route("signup")]
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
                return Ok(new
                {
                    result = "False",
                    message = "User with such email already exists!"
                });
            }
            catch (Exception e) { return Ok(e); }
        }

        //signin
        [HttpPost]
        [Route("login")]
        public IActionResult SignIn([FromBody] UserModel userModel)
        {
            try
            {
                bool result = UserService.Instance.SignIn(userModel);
                if (result == false)
                {
                    return Ok(new
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
                        name = UserService.Instance.userName
                    });
                }
            }
            catch (Exception e) { return Ok(e); }
        }
    }
}