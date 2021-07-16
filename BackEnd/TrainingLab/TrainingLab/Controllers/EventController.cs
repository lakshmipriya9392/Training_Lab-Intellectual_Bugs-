using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TrainingLab.Models;
using TrainingLab.Services;

namespace TrainingLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : Controller
    {

        [HttpGet]
        public async Task<IActionResult> GetEvents()        
        {            
            return Ok(await EventService.Instance.GetEvents());        
        }

        [HttpGet("futureEvents")]
        public async Task<IActionResult>  GetFutureEvents([FromQuery] string emailId)
        {
            return Ok(await EventService.Instance.GetFutureEvents(emailId));
        }

       
        [HttpPost("event")]
        public IActionResult AddEvent(EventModel eventModel)
        {
           if(EventService.Instance.AddEvent(eventModel))
            {
                return Ok();
            }
            Response.StatusCode = 204;
            return (IActionResult)Response;
            //return (new { result = "Couldn't insert data" });
        }

        [HttpPut("event")]
        public IActionResult UpdateEvent(EventModel eventModel,[FromQuery] int id)
        {
            if (EventService.Instance.UpdateEvent(eventModel,id))
            {
                return Ok();
            }
            Response.StatusCode = 204;
            return (IActionResult)Response;
            //return Ok(new { result = "Couldn't update data" });
        }

        [HttpDelete("event")]
        public IActionResult DeleteEvent([FromQuery] int id)
        {
            if (EventService.Instance.DeleteEvent(id))
            {
                return Ok();
            }
            Response.StatusCode = 204;
            return (IActionResult)Response;
            //return Ok(new { result = "Couldn't delete data" });
        }

        [HttpPost("attendee")]
        public IActionResult AddAttendee([FromBody] EventAttendeeModel eventAttendeeModel)
        {
            if(eventAttendeeModel.eventId<=0 || eventAttendeeModel.emailId=="")
            {
                Response.StatusCode = 204;
                return (IActionResult)Response;
                //return Ok(new { result = "Couldn't insert data" });
            }
            if (EventService.Instance.AddAttendee(eventAttendeeModel))
            {
                return Ok();
            }
            Response.StatusCode = 204;
            return (IActionResult)Response;
            //return Ok(new { result = "Couldn't insert data" });
        }
    }
}
