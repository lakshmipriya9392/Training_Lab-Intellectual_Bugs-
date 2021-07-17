using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System.Threading.Tasks;
using TrainingLab.Models;
using TrainingLab.Services;

namespace TrainingLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CourseController : Controller
    {
        //for redis cache
        public static IDistributedCache _distributedCache;
        public static string recordKey;
        public CourseController(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
            //recordKey = "Course_" + DateTime.Now.ToString("yyyyMMdd_hh");
        }
        [HttpGet]
        public async Task<IActionResult> GetCourses(string id)
        {                        
            return Ok(await CourseService.Instance.GetCourses(id));           
        }

        
        [HttpPost("chapter")]
        public IActionResult AddChapter(ChapterModel chapterModel)
        {
            if(CourseService.Instance.AddChapter(chapterModel))
            {
                return Ok();
            }
            return NoContent();

        }

        [HttpPut("chapter")]
        public IActionResult EditChapter(ChapterModel chapterModel,[FromQuery] int id)
        {
            if (CourseService.Instance.EditChapter(chapterModel,id))
            {
                return Ok();
            }
            return NoContent();
        }

        [HttpPost("topics")]
        public IActionResult AddTopics(TopicModel topicModel)
        {
            if (CourseService.Instance.AddTopics(topicModel))
            {
                return Ok();
            }
            return NoContent();
        }

        [HttpPut("topics")]
        public IActionResult EditTopics(TopicModel topicModel,[FromQuery] int id)
        {
            if (CourseService.Instance.EditTopics(topicModel,id))
            {
                return Ok();
            }
            return NoContent();
        }
    }
}
