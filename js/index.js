var feud_vue = new Vue({
    el: '#feud_admin',
  data: {
    Questions: [
      {
        QuestionID: 1,
        QuestionText: "What is the Best Javascript Library",
        Answers: [
          {
            AnswerID: 1,
            AnswerText: "Vue JS",
            AnswerVotes: 0
          },
          {
            AnswerID: 2,
            AnswerText: "React",
            AnswerVotes: 0
          },
          {
            AnswerID: 3,
            AnswerText: "Angular JS",
            AnswerVotes: 0
          },
          {
            AnswerID: 4,
            AnswerText: "JQuery",
            AnswerVotes: 0
          },
          {
            AnswerID: 6,
            AnswerText: "Ext JS",
            AnswerVotes: 0
          },
          {
            AnswerID: 7,
            AnswerText: "Backbone",
            AnswerVotes: 1
          }
        ]
      },
      {
        QuestionID: 2,
        QuestionText: "How many JS libraries is the perfect amount",
        Answers: []
      },
      {
        QuestionID: 3,
        QuestionText: "Code optimization, what makes the biggest impact",
        Answers: []
      },
      {
        QuestionID: 4,
        QuestionText: "What is the best database engine",
        Answers: []
      },
      {
        QuestionID: 5,
        QuestionText: "Best way to search for solutions",
        Answers: []
      },
      {
        QuestionID: 6,
        QuestionText: "Best source control tool",
        Answers: []
      },
      {
        QuestionID: 7,
        QuestionText: "What is the most secure encryption",
        Answers: []
      },
      {
        QuestionID: 8,
        QuestionText: "When should you decide to create a microservice",
        Answers: []
      },
      {
        QuestionID: 9,
        QuestionText: "What is the best testing suite",
        Answers: []
      }
    ],
    idxQuestions:{},
    activeQuestion: 1,
    upvotedAnswers: {
        1: true,
        3: true,
        4: true,
        6: true,
        11: true
    }
  },
  http: {},
  created: function() {
    var _self = this;
    this.idxQuestions = {};
    this.Questions.forEach(function (q,i) {
        _self.idxQuestions[q.QuestionID] = q;
    })
    console.log(_self.idxQuestions);
  },
  methods: {
    'checkVote': function (answer) {
        return this.upvotedAnswers.hasOwnProperty(answer.AnswerID) ? 'fas' : 'far';
    }
  }
});
