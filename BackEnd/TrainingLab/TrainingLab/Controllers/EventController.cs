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
            return NoContent();
        }

        [HttpPut("event")]
        public IActionResult UpdateEvent(EventModel eventModel,[FromQuery] int id)
        {
            if (EventService.Instance.UpdateEvent(eventModel,id))
            {
                return Ok();
            }
            return NoContent();
        }

        [HttpDelete("event")]
        public IActionResult DeleteEvent([FromQuery] int id)
        {
            if (EventService.Instance.DeleteEvent(id))
            {
                return Ok();
            }
            return NoContent();
        }

        [HttpPost("attendee")]
        public IActionResult AddAttendee([FromBody] EventAttendeeModel eventAttendeeModel)
        {
            if(eventAttendeeModel.eventId<=0 || eventAttendeeModel.emailId=="")
            {
                return NoContent();
            }
            if (EventService.Instance.AddAttendee(eventAttendeeModel))
            {
                return Ok();
            }
            return NoContent();
        }
    }
}
