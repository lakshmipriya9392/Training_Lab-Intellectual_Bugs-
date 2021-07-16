using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrainingLab.Models;

namespace TrainingLab.Services
{
    public class EventService
    {
        private static Lazy<EventService> Initializer = new Lazy<EventService>(() => new EventService());
        public static EventService Instance => Initializer.Value;
        SQLiteConnection con = new SQLiteConnection("Data Source=" + Startup.connectionString);
        public async Task<IEnumerable<EventModel>> GetEvents()
        {
            List<EventModel> eventModels = new List<EventModel>();
            SQLiteCommand cmd = new SQLiteCommand();
            SQLiteDataReader dr;
            EventModel eventModel;
            try
            {
                cmd.Connection = con;
                con.Open();                                
                cmd.CommandText = "select * from Event EXCEPT select * from Event where StartTime>='" + DateTime.UtcNow.AddHours(5.5).ToString("yyyy-MM-dd HH:mm:ss") + "' ORDER BY StartTime DESC";                            
                dr = cmd.ExecuteReader();

                int i = 0;

                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        eventModel = new EventModel();
                        GetEventAttendee(i, eventModel, dr.GetInt32(0));
                        eventModel.EventId = dr.GetInt32(0);
                        eventModel.EventName = dr.GetString(1);
                        DateTime date = DateTime.Parse(dr.GetString(2));
                        eventModel.StartTime = date.ToString("f", CultureInfo.CreateSpecificCulture("en-US"));
                        date = DateTime.Parse(dr.GetString(3));
                        eventModel.EndTime = date.ToString("f", CultureInfo.CreateSpecificCulture("en-US"));
                        eventModel.Description = dr.GetString(4);
                        eventModel.EventURL = "http://localhost:5500/videos/events" + dr.GetString(5);
                        eventModels.Add(eventModel);
                    }
                }
                dr.Close();
                return eventModels;
            }
            catch (Exception e)
            {
                return eventModels;
            }
            finally
            {
                cmd.Dispose();
                con.Close();
            }
        }

        public async Task<IEnumerable<EventModel>> GetFutureEvents(string emailId)
        {
            List<EventModel> eventModels = new List<EventModel>();
            EventModel eventModel;
            SQLiteCommand cmd = new SQLiteCommand();
            SQLiteCommand cmdd = new SQLiteCommand();
            SQLiteDataReader dr;
            try
            {
                cmd.Connection = con;
                cmdd.Connection = con;
                con.Open();
                cmd.CommandText = "select * from Event where StartTime>='" + DateTime.UtcNow.AddHours(5.5).ToString("yyyy-MM-dd HH:mm:ss") + "'";
                dr = cmd.ExecuteReader();
                int i = 0;
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {

                        eventModel =new EventModel();
                        GetEventAttendee(i, eventModel, dr.GetInt32(0));
                        eventModel.EventId = dr.GetInt32(0);
                        eventModel.EventName = dr.GetString(1);
                        DateTime date = DateTime.Parse(dr.GetString(2));
                        eventModel.StartTime = date.ToString("f", CultureInfo.CreateSpecificCulture("en-US"));
                        date = DateTime.Parse(dr.GetString(3));
                        eventModel.EndTime = date.ToString("f", CultureInfo.CreateSpecificCulture("en-US"));
                        eventModel.Description = dr.GetString(4);
                        eventModel.EventURL = "http://localhost:5500/videos/events" + dr.GetString(5);
                        eventModel.imageURL = "http://localhost:5500/images/events" + dr.GetString(6);

                        //To check whether the logged user has already registerd or is gonna attend this event
                        cmdd.CommandText = "select count(*) from EventAttendee where EmailId='" + emailId + "' and EventId='" + eventModel.EventId + "'";
                        int totalCount = int.Parse(cmdd.ExecuteScalar().ToString());
                        if (totalCount > 0)
                            eventModel.attendeeModel.Attendee = true;
                        else
                            eventModel.attendeeModel.Attendee = false;
                        eventModels.Add(eventModel);
                    }
                }
                dr.Close();               
                return eventModels;
            }
            catch (Exception e)
            {                
                return eventModels;
            }
            finally
            {
                cmd.Dispose();
                con.Close();
            }
        }

        public void GetEventAttendee(int i, EventModel eventModel, int eventId)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            SQLiteDataReader sQLiteDataReader = null;
            try
            {
                cmd.Connection = con;
                cmd.CommandText = "select u.Name,ea.Panelist from User u inner join EventAttendee ea on u.EmailId=ea.EmailId inner join Event e on e.Id=ea.EventId where e.Id='" + eventId + "'";
                sQLiteDataReader = cmd.ExecuteReader();

                StringBuilder attendee = new StringBuilder();
                eventModel.attendeeModel = new EventAttendeeModel();
                //List of Panelists                
                eventModel.attendeeModel.Panelists = new List<string>();
                //Total number of attendees
                eventModel.Attendee = 0;
                if (sQLiteDataReader.HasRows)
                {
                    int j = 0;
                    while (sQLiteDataReader.Read())
                    {
                        if (sQLiteDataReader["Panelist"].ToString() == "True")
                        {
                            eventModel.attendeeModel.Panelists.Add(sQLiteDataReader["Name"].ToString());
                        }
                        else
                        {
                            eventModel.Attendee += 1;
                        }
                        j++;
                    }
                }
                sQLiteDataReader.Close();
            }
            catch (Exception e)
            {                               
                eventModel.attendeeModel.Panelists = null;
                eventModel.Attendee = 0;
            }
            finally {
                cmd.Dispose();
            }
        }

        public bool AddEvent(EventModel eventModel)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            cmd.Connection = con;
            try
            {
                con.Open();
                cmd.CommandText = "INSERT INTO Event(EventName,StartTime,EndTime,Description,EventURL) VALUES (@eventName,@startTime,@endTime,@description,@eventURL)";
                cmd.Parameters.AddWithValue("@eventName", eventModel.EventName);
                cmd.Parameters.AddWithValue("@startTime", eventModel.StartTime);
                cmd.Parameters.AddWithValue("@endTime", eventModel.EndTime);
                cmd.Parameters.AddWithValue("@description", eventModel.Description);
                cmd.Parameters.AddWithValue("@eventURL", eventModel.EventURL);
                int rowsAffected = cmd.ExecuteNonQuery();
                cmd.CommandText = "select Id from Event where EventName='" + eventModel.EventName + "' AND StartTime='" + eventModel.StartTime + "'";
                int eventId = int.Parse(cmd.ExecuteScalar().ToString());
                eventModel.attendeeModel = new EventAttendeeModel();
                List<string> panelists = eventModel.attendeeModel.Panelists;
                int i = 0;
                while (i < panelists.Count)
                {
                    cmd.CommandText = "INSERT INTO EventAttendee(Panelist,EmailId,EventId) VALUES('True','" + panelists[i] + "','" + eventId + "')";
                    rowsAffected = cmd.ExecuteNonQuery();
                }
                return true;
            }
            catch (Exception e)
            {                
                return false;
            }
            finally
            {
                cmd.Dispose();
                con.Close();
            }
        }

        public bool UpdateEvent(EventModel eventModel, int id)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            cmd.Connection = con;
            try
            {
                con.Open();
                cmd.CommandText = "UPDATE Event SET EventName=@eventName,StartTime=@startTime,EndTime=@endTime,Description=@description,EventURL=@eventURL where Id='" + id + "'";
                cmd.Parameters.AddWithValue("@eventName", eventModel.EventName);
                cmd.Parameters.AddWithValue("@startTime", eventModel.StartTime);
                cmd.Parameters.AddWithValue("@endTime", eventModel.EndTime);
                cmd.Parameters.AddWithValue("@description", eventModel.Description);
                cmd.Parameters.AddWithValue("@eventURL", eventModel.EventURL);
                int rowsAffected = cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                cmd.Dispose();
                con.Close();
            }
        }

        public bool DeleteEvent(int id)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            cmd.Connection = con;
            try
            {
                con.Open();
                cmd.CommandText = "DELETE * FROM Event where Id='" + id + "'";
                int rowsAffected = cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                cmd.Dispose();
                con.Close();
            }
        }
        public bool AddAttendee(EventAttendeeModel eventAttendeeModel)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            cmd.Connection = con;
            try
            {
                con.Open();
                cmd.CommandText = "INSERT INTO EventAttendee(EmailId,EventId,Panelist) VALUES('" + eventAttendeeModel.emailId + "','" + eventAttendeeModel.eventId + "','False')";
                int rowsAffected = cmd.ExecuteNonQuery();
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
            catch(Exception e)
            {
                return false;
            }
            finally
            {
                cmd.Dispose();
                con.Close();
            }
        }
    }
}
