using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TrainingLab.Controllers;
using TrainingLab.Extensions;
using TrainingLab.Models;

namespace TrainingLab.Services
{
    public class TestService
    {
        private static Lazy<TestService> Initializer = new Lazy<TestService>(() => new TestService());
        public static TestService Instance => Initializer.Value;
        SQLiteConnection con = new SQLiteConnection("Data Source=" + Startup.connectionString);
        private string loadLocation = "";
        private string isCacheData = "";
        static int testId = 0;

        public async Task<IEnumerable> GetCourses(string id,string levelName)
        {
            if (id == null)
            {
                TestController.recordKey = "TestCourse_" + DateTime.Now.ToString("yyyyMMdd_hh");
                return  await GetCourseDetails();
            }
            else
            {
                TestController.recordKey = "Questionnaire_"+id+"_"+levelName+"_" + DateTime.Now.ToString("yyyyMMdd_hh");
                return  await GetQuestionnaires(id, levelName);
            }
        }

        //Get Total levels exist 
        public async Task<IEnumerable> GetLevels()
        {
            SQLiteCommand cmd = new SQLiteCommand();
            TestController.recordKey = "Level_" + DateTime.Now.ToString("yyyyMMdd_hh");
            List<LevelModel> levelModels;
            LevelModel levelModel;
            IDistributedCache cache = TestController._distributedCache;
            loadLocation = null;
            string recordKey = TestController.recordKey;
            //Getting data from cache
            levelModels = null;
            //levelModels= await cache.GetRecordAsync<List<LevelModel>>(recordKey);
            if (levelModels is null)
            {
                try
                {
                    cmd.Connection = con;
                    con.Open();
                    cmd.CommandText = "select * from Level";
                    SQLiteDataReader sQLiteDataReader = cmd.ExecuteReader();
                    levelModels = new List<LevelModel>();
                    if (sQLiteDataReader.HasRows)
                    {
                        while (sQLiteDataReader.Read())
                        {
                            levelModel=new LevelModel();
                            levelModel.levelId = sQLiteDataReader.GetInt32(0);
                            levelModel.levelName = sQLiteDataReader.GetString(1);
                            levelModels.Add(levelModel);
                        }
                    }
                    sQLiteDataReader.Close();
                    loadLocation = "Loaded from API at" + DateTime.Now;
                    Console.WriteLine(loadLocation);
                    isCacheData = "";
                    //Setting data in cache
                    //await cache.SetRecordAsync(recordKey, levelModels);
                    return levelModels;
                }
                catch (Exception e)
                {
                    return levelModels;
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
                return levelModels;
            }
        }

        //Get course Names for selection
        public async Task<List<CourseModel>> GetCourseDetails()
        {
            SQLiteCommand cmd = new SQLiteCommand();
            List<CourseModel> courseModels;
            CourseModel courseModel;
            IDistributedCache cache = TestController._distributedCache;
            loadLocation = null;
            string recordKey = TestController.recordKey;
            //Getting data from cache
            courseModels = null;
            //courseModel=await cache.GetRecordAsync<List<CourseModel>>(recordKey);
            if (courseModels is null)
            {
                try
                {
                    cmd.Connection = con;
                    con.Open();
                    cmd.CommandText = "select * from Course";
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
                            courseModel.imageURL = sQLiteDataReader["ImageURL"].ToString();
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

        //Get questionnaire for particular Course and Level
        public async Task<List<QuestionnaireModel>> GetQuestionnaires(string id, string levelName)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            List<QuestionnaireModel> questionnaireModels;
            QuestionnaireModel questionnaireModel;
            IDistributedCache cache = TestController._distributedCache;
            loadLocation = null;
            string recordKey = TestController.recordKey;
            //Getting data from cache
            questionnaireModels = null;
            //questionnaireModel=await cache.GetRecordAsync<List<QuestionnaireModel>>(recordKey);
            if (questionnaireModels is null)
            {
                try
                {
                    cmd.Connection = con;
                    con.Open();
                    cmd.CommandText = "select q.Id,t.Id,q.NoOfOptions,l.LevelName,q.QuestionText,q.TypeOfQuestion from Test t inner join Course c on c.Id=t.CourseId inner join Questionnaire q on t.Id=q.TestId inner join Level l on l.Id=t.LevelId where c.Id='" + id + "' and l.LevelName='" + levelName + "'";
                    SQLiteDataReader dr = cmd.ExecuteReader();                    
                    questionnaireModels = new List<QuestionnaireModel>();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            questionnaireModel=new QuestionnaireModel();
                            questionnaireModel.questionId = dr.GetInt32(0);
                            questionnaireModel.testId = dr.GetInt32(1);
                            questionnaireModel.question = dr.GetString(4);
                            questionnaireModel.typeOfQuestion = dr.GetString(5);
                            questionnaireModel.noOfOptions = dr.GetInt32(2);
                            SQLiteCommand cmdd = new SQLiteCommand();
                            cmdd.Connection = con;

                            cmdd.CommandText = "select * from Options where QuestionId='" + questionnaireModel.questionId + "'";
                            SQLiteDataReader sQLiteDataReader = cmdd.ExecuteReader();
                            OptionModel optionModel; //new OptionModel[questionnaireModel.noOfOptions];
                            List<OptionModel> optionModels = new List<OptionModel>();
                            if (sQLiteDataReader.HasRows)
                            {
                                while (sQLiteDataReader.Read())
                                {
                                    int j = 0;
                                    while (j < questionnaireModel.noOfOptions)
                                    {
                                        optionModel = new OptionModel();
                                        optionModel.option = sQLiteDataReader.GetString(j+1);
                                        optionModel.optionId = sQLiteDataReader.GetInt32(0);
                                        optionModels.Add(optionModel);
                                    }
                                }
                            }
                            sQLiteDataReader.Close();
                            cmdd.Dispose();
                            questionnaireModel.optionList = optionModels;
                            questionnaireModels.Add(questionnaireModel);
                        }
                    }
                    dr.Close();
                    loadLocation = "Loaded from API at" + DateTime.Now;
                    Console.WriteLine(loadLocation);
                    isCacheData = "";
                    //Setting data in cache
                    //await cache.SetRecordAsync(recordKey, questionnaireModel);
                    return questionnaireModels;
                }
                catch (Exception e)
                {
                    return questionnaireModels;
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
                return questionnaireModels;
            }
        }

        public static int score = 0;
        public static int totalCorrectAnswer = 0;
        public static int totalWrongAnswer = 0;
        
        //Check if user selected answer is correct or not
        public async Task<string> CheckAnswer(int id, string answer, string emailId)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "select CorrectAnswer from Questionnaire where Id='" + id + "'";
                string correctAnswer = cmd.ExecuteScalar().ToString();
                if (correctAnswer.Equals(answer))
                {
                    score++;
                    totalCorrectAnswer++;
                    return "True";
                }
                else
                {
                    totalWrongAnswer++;
                    return correctAnswer;
                }
            }
            catch(Exception e)
            {
                return "False";
            }
            finally
            {
                cmd.Dispose();
                con.Close();
            }
        }

        //Store the score in database
        public async Task<bool> PostScore(int id,string emailId)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "INSERT INTO UserTestLevel(EmailId,TestId,Status) VALUES('" + emailId + "','" + id + "','UPGRADING')";
                int rowsAffetcted = cmd.ExecuteNonQuery();
                bool result=await UpgradeLevel(id, score, emailId);
                ClearScore();
                return true;
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

        //Upgrading level based on user score
        public async Task<bool> UpgradeLevel(int id, int score, string emailId)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                cmd.CommandText = "SELECT MinimumScore from Test where Id='" + id + "'";
                float minimumScore = float.Parse(cmd.ExecuteScalar().ToString());
                cmd.CommandText = "INSERT INTO UserScore(Score,EmailId,TestId) VALUES('" + score + "','" + emailId + "','" + id + "')";
                int rowsAffetcted = cmd.ExecuteNonQuery();
                if (score >= minimumScore)
                {
                    cmd.CommandText = "UPDATE UserTestLevel SET Status='PASSED' where EmailId='" + emailId + "' and TestId='" + id + "'";
                    rowsAffetcted = cmd.ExecuteNonQuery();
                }
                if(rowsAffetcted>0)
                    return true;
                else
                    return false;
            }
            catch(Exception e)
            {
                return false;
            }
            finally
            {
                cmd.Dispose();
            }
        }

        public void ClearScore()
        {
            totalCorrectAnswer = 0;
            totalWrongAnswer = 0;
            score = 0;
        }
        public bool AddQuestion(QuestionnaireModel[] questionnaireModels)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                int i = 0, rowsAffected = 0;
                while (i < questionnaireModels.Length)
                {
                    List<OptionModel> optionModel =questionnaireModels[i].optionList;
                    cmd.CommandText = "INSERT INTO Questionnaire(QuestionText,TypeOfQuestion,CorrectAnswer,NoOfOptions,TestId) VALUES('" + questionnaireModels[i].question + "','" + questionnaireModels[i].typeOfQuestion + "','" + questionnaireModels[i].answer + "','" +questionnaireModels[i].noOfOptions+"','"+ questionnaireModels[i].testId + "')";
                    rowsAffected = cmd.ExecuteNonQuery();
                    if (rowsAffected < 0)
                    {
                        break;
                    }
                    cmd.CommandText = "select Id from Questionnaire where QuestionText='" + questionnaireModels[i].question+"' and TestId='"+questionnaireModels[i].testId+"'";
                    int questionId=int.Parse(cmd.ExecuteScalar().ToString());
                    if (rowsAffected < 0)
                    {
                        break;
                    }
                    AddOptions(optionModel,questionId);
                    i++;
                }
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

        public bool AddOptions(List<OptionModel> optionModel,int questionId)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
           
                int  rowsAffected = 0;
                if (optionModel.Count > 2)
                {
                    cmd.CommandText = "INSERT INTO Options(OptionA,OptionB,OptionC,OptionD,QuestionId) VALUES('" + optionModel[0].option + "','" + optionModel[1].option + "','" + optionModel[2].option + "','" + optionModel[3].option + "','" + questionId + "')";
                }
                else
                {
                    cmd.CommandText = "INSERT INTO Options(OptionA,OptionB,QuestionId) VALUES('" + optionModel[0].option + "','" + optionModel[1].option + "','" + questionId + "')";
                }
                rowsAffected = cmd.ExecuteNonQuery();
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
