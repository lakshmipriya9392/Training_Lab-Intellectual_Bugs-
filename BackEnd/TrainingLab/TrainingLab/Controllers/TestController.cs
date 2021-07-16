using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TrainingLab.Models;
using TrainingLab.Services;

namespace TrainingLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : Controller
    {
        //for redis cache
        public static IDistributedCache _distributedCache;
        public static string recordKey;
        public TestController(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
            //recordKey = "Course_" + DateTime.Now.ToString("yyyyMMdd_hh");
        }

        [HttpGet]
        public async Task<IActionResult> GetCourses([FromQuery] string id, [FromQuery] string levelName)
        {
            return Ok(await TestService.Instance.GetCourses(id, levelName));
        }

        [HttpGet("level")]
        public async Task<IActionResult> GetLevels()
        {
            return Ok(await TestService.Instance.GetLevels());
        }

        [HttpPost("clearScore")]
        public IActionResult ClearScore()
        {
            TestService.Instance.ClearScore();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> PostAnswer(int id, string answer, string emailId)
        {
            try
            {
                string checkAnswer = await TestService.Instance.CheckAnswer(id, answer, emailId);
                if (checkAnswer == "True")
                {
                    return Ok(new { message = "CORRECT ANSWER!" });
                }
                else
                {
                    return Ok(new { message = "WRONG ANSWER!", correctAnswer = checkAnswer });
                }
            }
            catch(Exception e)
            {
                Response.StatusCode = 204;
                return (IActionResult)Response;
                //return Ok(e);
            }
        }

        [HttpPost("score")]
        public async Task<IActionResult> PostScore(int id, string emailId)
        {
            try
            {
                if (await TestService.Instance.PostScore(id, emailId))
                {
                    int totalCorrectAnswer = TestService.totalCorrectAnswer;
                    int totalWrongAnswer = TestService.totalWrongAnswer;
                    int score = TestService.score;
                    TestService.totalCorrectAnswer = 0;
                    TestService.totalWrongAnswer = 0;
                    TestService.score = 0;
                    return Ok(new { totalQuestion = totalCorrectAnswer + totalWrongAnswer, totalCorrectAnswer = totalCorrectAnswer, totalWrongAnswer = totalWrongAnswer, score = score });
                }
                Response.StatusCode = 204;
                return (IActionResult)Response;
                //return Ok(new { result = "something gone wrong!" });
            }
            catch(Exception e)
            {
                Response.StatusCode = 204;
                return (IActionResult)Response;
                //return Ok(e);
            }
        }


        [HttpPost("question")]
        public IActionResult AddQuestion(QuestionnaireModel[] questionnaireModels)
        {
            try
            {
                if (TestService.Instance.AddQuestion(questionnaireModels))
                {
                    return Ok(new { result = "success" });
                }
                Response.StatusCode = 204;
                return (IActionResult)Response;
                //return Ok(new { result = "something gone wrong!" });
            }
            catch(Exception e)
            {
                Response.StatusCode = 204;
                return (IActionResult)Response;
                //return Ok(e);
            }
        }

    }
}
