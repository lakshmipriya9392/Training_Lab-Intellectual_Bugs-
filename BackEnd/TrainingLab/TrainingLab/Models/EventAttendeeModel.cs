using System.Collections.Generic;

namespace TrainingLab.Models
{
    public class EventAttendeeModel
    {
        public List<string> Panelists { get; set; }
        public int eventId { get; set; }
        public string emailId { get; set; }
        public bool Attendee { get; set; }
    }
}
