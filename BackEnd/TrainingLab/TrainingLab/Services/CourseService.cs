using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;
using TrainingLab.Models;
using TrainingLab.Extensions;
using Microsoft.Extensions.Caching.Distributed;
using TrainingLab.Controllers;
using TrainingLab.Services;

namespace TrainingLab.Services
{
    public class CourseService
    {
        private static Lazy<CourseService> Initializer = new Lazy<CourseService>(() => new CourseService());
        public static CourseService Instance => Initializer.Value;
        SQLiteConnection con = new SQLiteConnection("Data Source=" + Startup.connectionString);
        private string loadLocation = "";
        private string isCacheData = "";
        SQLiteDataReader dr;
        public async Task<IEnumerable> GetCourses(string id)
        {
            if (id == null)
            {
                CourseController.recordKey = "Course_" + DateTime.Now.ToString("yyyyMMdd_hh");
                List<CourseModel> courseModel = await GetCourseDetails();
                return courseModel;
            }
            else
            {
                CourseController.recordKey = "Chapter_"+id+"_" + DateTime.Now.ToString("yyyyMMdd_hh");
                List<ChapterModel> chapterModel =await GetCourseTopics(id);
                return chapterModel;
            }
        }
        public async Task<List<ChapterModel>> GetCourseTopics(string id)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            SQLiteCommand cmdd = new SQLiteCommand();
            List<ChapterModel> chapterModels;
            ChapterModel chapterModel;
            IDistributedCache cache = CourseController._distributedCache;
            loadLocation = null;
            string recordKey = CourseController.recordKey;
            //Getting data from cache
            chapterModels = null;
            //await cache.GetRecordAsync<List<ChapterModel>>(recordKey);
            if (chapterModels is null)
            {
                try
                {
                    cmd.Connection = con;
                    cmdd.Connection = con;

                    cmd.CommandText = "select * from Chapter where CourseId='" + id + "'";
                    con.Open();
                    SQLiteDataReader dr = cmd.ExecuteReader();
                    chapterModels = new List<ChapterModel>();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            chapterModel=new ChapterModel();
                            chapterModel.chapterId = dr.GetInt32(0);
                            chapterModel.chapterName = dr.GetString(1);
                            cmdd.CommandText = "select * from Topic t inner join Chapter ch on ch.Id=t.ChapterId inner join Course c on c.Id=ch.CourseId where t.ChapterId='" + chapterModel[i].chapterId + "'";
                            SQLiteDataReader sQLiteDataReader = cmdd.ExecuteReader();
                            List<TopicModel> topicModels = new List<TopicModel>();
                            TopicModel topicModel;
                            if (sQLiteDataReader.HasRows)
                            {
                                while (sQLiteDataReader.Read())
                                {
                                    topicModel = new TopicModel();
                                    topicModel.topicId = int.Parse(sQLiteDataReader["Id"].ToString());
                                    topicModel.topicName = sQLiteDataReader["TopicName"].ToString();
                                    topicModel.videoURL = "http://localhost:5500/videos/courses" + sQLiteDataReader["VideoURL"].ToString();
                                    topicModel.notesURL = sQLiteDataReader["NotesURL"].ToString();
                                    topicModel.chapterId = int.Parse(sQLiteDataReader["ChapterId"].ToString());
                                    topicModels.Add(topicModel);
                                }
                            }
                            chapterModel.topics = topicModels;
                            sQLiteDataReader.Close();
                            chapterModels.Add(chapterModel);
                        }
                    }
                    dr.Close();
                    loadLocation = "Loaded from API at" + DateTime.Now;
                    Console.WriteLine(loadLocation);
                    isCacheData = "";
                    //Setting data in cache
                    //await cache.SetRecordAsync(recordKey, chapterModel);
                    return chapterModels;
                }
                catch (Exception e)
                {
                    return chapterModels;
                }
                finally
                {
                    cmd.Dispose();
                    cmdd.Dispose();
                    con.Close();
                }
            }
            else
            {
                loadLocation = "Loaded from cache at" + DateTime.Now;
                Console.WriteLine(loadLocation);
                isCacheData = "data";
                return chapterModels;
            }
        }


        public async Task<List<CourseModel>> GetCourseDetails()
        {
            SQLiteCommand cmd = new SQLiteCommand();
            IDistributedCache cache = CourseController._distributedCache;
            List<CourseModel> courseModels;
            CourseModel courseModel;
            loadLocation = null;
            string recordKey = CourseController.recordKey;
            //Getting data from cache
            courseModels = null;
            //await cache.GetRecordAsync<List<CourseModel>>(recordKey);
            if (courseModels is null)
            {
                try
                {
                    cmd.Connection = con;
                    cmd.CommandText = "select * from Course";
                    con.Open();
                    SQLiteDataReader sQLiteDataReader = cmd.ExecuteReader();
                    courseModels = new List<CourseModel>();
                    if (sQLiteDataReader.HasRows)
                    {
                        while (sQLiteDataReader.Read())
                        {
                            courseModel=new CourseModel();
                            courseModel.courseId = int.Parse(sQLiteDataReader["Id"].ToString());
                            courseModel.courseName = sQLiteDataReader["CourseName"].ToString();
                            courseModel.authorName = sQLiteDataReader["AuthorName"].ToString();
                            courseModel.imageURL = "http://localhost:5500/images/courses" + sQLiteDataReader["ImageURL"].ToString();
                            courseModels.Add(courseModel);
                        }
                    }
                    sQLiteDataReader.Close();
                    loadLocation = "Loaded from API at" + DateTime.Now;
                    Console.WriteLine(loadLocation);
                    isCacheData = "";
                    //Setting data in cache
                    //await cache.SetRecordAsync(recordKey, courseModel);
                    return courseModels;
                }
                catch (Exception e)
                {
                    return courseModels;
                }
                finally
                {
                    cmd.Dispose();
                    con.Close();
                }
            }
            else
            {
                loadLocation = "Loaded from cache at" + DateTime.Now;
                Console.WriteLine(loadLocation);
                isCacheData = "data";
                return courseModels;
            }

        }
       


        public bool AddChapter(ChapterModel chapterModel)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "INSERT INTO Chapter(Id,Chaptername,CourseId) VALUES (@chapterId,@chaptername,@courseId)";
                cmd.Parameters.AddWithValue("@chapterId", chapterModel.chapterId);
                cmd.Parameters.AddWithValue("@chaptername", chapterModel.chapterName);
                cmd.Parameters.AddWithValue("@courseId", chapterModel.courseId);
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

        public bool EditChapter(ChapterModel chapterModel, int id)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "UPDATE Chapter SET Id=@chapterId,Chaptername=@chapterName,CourseId=@courseId where Id='" + id + "'";
                cmd.Parameters.AddWithValue("@chapterId", chapterModel.chapterId);
                cmd.Parameters.AddWithValue("@chaptername", chapterModel.chapterName);
                cmd.Parameters.AddWithValue("@courseId", chapterModel.courseId);
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

        public bool AddTopics(TopicModel topicModel)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "INSERT INTO Topic(TopicName,VideoURL,NotesURL,ChapterId) VALUES (@topicName,@videoURL,@notesURL,@chapterId)";
                cmd.Parameters.AddWithValue("@topicName", topicModel.topicName);
                cmd.Parameters.AddWithValue("@videoURL", topicModel.videoURL);
                cmd.Parameters.AddWithValue("@notesURL", topicModel.notesURL);
                cmd.Parameters.AddWithValue("@chapterId", topicModel.chapterId);
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

        public bool EditTopics(TopicModel topicModel, int id)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "UPDATE Topic SET TopicName=@topicName,VideoURL=@videoURL,NotesURL=@notesURL,ChapterId=@chapterId where Id='" + id + "'";
                cmd.Parameters.AddWithValue("@topicName", topicModel.topicName);
                cmd.Parameters.AddWithValue("@videoURL", topicModel.videoURL);
                cmd.Parameters.AddWithValue("@notesURL", topicModel.notesURL);
                cmd.Parameters.AddWithValue("@chapterId", topicModel.chapterId);
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
    }
}

