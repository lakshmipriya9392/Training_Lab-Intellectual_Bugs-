using System;
using System.Data.SQLite;
using TrainingLab.Models;

namespace TrainingLab.Services
{
    public class UserService
    {

        private static Lazy<UserService> Initializer = new Lazy<UserService>(() => new UserService());
        public static UserService Instance => Initializer.Value;
        SQLiteConnection con = new SQLiteConnection("Data Source=" + Startup.connectionString);
        
        public bool SignUp(UserModel user)
        {
           
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "select count(*) from User where EmailId='" + user.emailId + "'";
                int userCount = int.Parse(cmd.ExecuteScalar().ToString());
                if (userCount > 0)
                {
                    return false;
                }
                else
                {
                    //string s = Crypto.Encryptor.Encrypt(user.password);
                    cmd.CommandText = "INSERT INTO User(Name,EmailId,Password) VALUES('" + user.name + "','" + user.emailId + "','" + user.password + "')";
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return true;
                }
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

        public string userName = null;
        public bool SignIn(UserModel userModel)
        {
            SQLiteCommand cmd = new SQLiteCommand();
            try
            {
                cmd.Connection = con;
                con.Open();
                //string newPassword = Crypto.Encryptor.Encrypt(userModel.password);
                UserModel user = new UserModel();
                cmd.CommandText = "SELECT * FROM User WHERE EmailId ='" + userModel.emailId + "' AND Password='" + userModel.password + "'";
                SQLiteDataReader dr = cmd.ExecuteReader();
                
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        userName = dr.GetString(1);
                    }
                }
                dr.Close();               
                return !(userName==null);
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
