using System.Collections.Generic;

namespace TrainingLab.Models
{
    public class QuestionnaireModel
    {
        public int questionId { get; set; }       
        public string question { get; set; }
        public List<OptionModel> optionList { get; set; }
        public string answer { get; set; }
        public int noOfOptions { get; set; }
        public string typeOfQuestion { get; set; }
        public int testId { get; set; }
    }
}
