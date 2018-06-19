var feud_vue = new Vue({
  el: "#feud_admin",
  data: {
    activeUser: 1,
    userList: [
      { id: 1, name: "Admin" },
      { id: 2, name: "User 1" },
      { id: 3, name: "User 2" },
      { id: 4, name: "User 3" },
      { id: 5, name: "User 4" }
    ],
    questionDB: [],
    searchText: "",
    idxQuestions: {},
    formData: {
      QuestionID: 0,
      QuestionText: "",
      AnswerText: ""
    },
    upvotedAnswers: []
  },
  http: {},
  created: function() {
    var _self = this;
    this.changeUser(1);
    this.idxQuestions = {};
    this.$http.get("http://localhost:3000/questions").then(function(res) {
      _self.questionDB = res.body;
      _self.questionDB.forEach(function(q, i) {
        _self.idxQuestions[q.QuestionID] = q;
      });
    });
  },
  methods: {
    changeUser: function(userID) {
      this.activeUser = userID;
      this.getUserVotes();
    },
    getUserVotes: function() {
      var _self = this;
      this.$http
        .post("http://localhost:3000/uservotes", { userID: this.activeUser })
        .then(function(res) {
          console.log(res);
          _self.upvotedAnswers = res.body;
        });
    },
    checkVote: function(answer) {
      return this.upvotedAnswers.indexOf(answer.AnswerID) != -1 ? "fas" : "far";
    },
    addNewQuestion: function () {
      
      this.formData.QuestionID = 0;
      this.formData.QuestionText = "";
      this.formData.AnswerText = "";
    },
    editQuestion: function(question) {
      this.formData.QuestionID = question.QuestionID;
      this.formData.QuestionText = question.QuestionText;
      this.formData.AnswerText = "";
    },
    saveQuestion: function() {
      var _self = this;
      this.$http
        .post("http://localhost:3000/question", {
          questionID: this.formData.QuestionID,
          questionText: this.formData.QuestionText
        })
        .then(function(res) {
          var result = res.body[0];
          console.log(result);
          if (_self.idxQuestions.hasOwnProperty(result.QuestionID)){
            for (var i in result) {
              _self.idxQuestions[result.QuestionID][i] = result[i];
            }
          } else {
            _self.questionDB.push(result);
            var question = _self.questionDB[_self.questionDB.length-1];
            _self.idxQuestions[result.QuestionID] = question;
            _self.editQuestion(question);

          }
        });
    },
    getQuestionAnswers: function() {
      if (this.idxQuestions.hasOwnProperty(this.formData.QuestionID))
        return this.idxQuestions[this.formData.QuestionID].Answers;
      return [];
    },
    addAnswer: function() {
      if (this.formData.AnswerText == "") return false;
      var _self = this;
      this.$http
        .post("http://localhost:3000/answer", {
          questionID: this.formData.QuestionID,
          answerText: this.formData.AnswerText,
          userID: this.activeUser
        })
        .then(function(res) {
          var result = res.body;

          _self.idxQuestions[_self.formData.QuestionID]["Answers"].push(result);
          _self.upvotedAnswers.push(result.AnswerID);
          _self.formData.AnswerText = "";
        });
    },
    toggleVote: function(answer) {
      var _self = this;
      var wasUpvoted = this.upvotedAnswers.indexOf(answer.AnswerID) != -1;
      var endpoint = wasUpvoted ? "unvote" : "vote";
      this.$http
        .post("http://localhost:3000/" + endpoint, {
          answerID: answer.AnswerID,
          userID: this.activeUser
        })
        .then(function(res) {
          var result = res.body;
            console.log(result);
          for (var i in result) {
            answer[i] = result[i];
          }

          if (wasUpvoted) {
            _self.upvotedAnswers.splice(_self.upvotedAnswers.indexOf(answer.AnswerID),1);
          } else {  
            _self.upvotedAnswers.push(answer.AnswerID)
          }
        });
    }
  }
});
