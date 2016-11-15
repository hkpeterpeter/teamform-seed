
var app = angular.module('myApp', []);

<!-- question only as it is for saving single question-->
app.service('backup', function() {
  var question ;
  console.log('in the backup');



  var saveQuestion = function(newObj) {
      question =jQuery.extend(true,{},newObj);
      console.log('see see the obj');
      console.log(newObj);
      console.log('see see the question');
      console.log(question);
  };

  var getQuestion = function(){
    console.log('getQuestion called');
    console.log('question return');
    console.log(question);
      return question;
  };

  return {
    saveQuestion: saveQuestion,
    getQuestion: getQuestion
  };

});


app.controller('trial', function($scope, backup) {
    $scope.questionList = [];
    $scope.tempQuestion ='';
    var question = {
      title : "Can you feel my heart beat?",
      type : "MC",
      choice: ["A","B","C","D"],
      answer: "A"
    };
    var question2 = {
      title : "Can you feel my head beat?",
      type : "MC",
      choice: ["A","B","C","D"],
      answer: "A"
    };
    var question3 = {
      title : "Can you feel my hand beat?",
      type : "MC",
      choice: ["A","B","C","D"],
      answer: "A"
    };
    $scope.questionList.push(question);
    $scope.questionList.push(question2);
    $scope.questionList.push(question3);

    console.log($scope.questionList);

    $scope.goBackup = function(questionNo)
    {
      console.log('goBackup called');
      console.log($scope.questionList[questionNo]);
      backup.saveQuestion($scope.questionList[questionNo]);
      $scope.tempQuestion = backup.getQuestion();
    };

    $scope.getBackup = function()
    {
      $scope.tempQuestion = backup.getQuestion();
      console.log('temp Question setted');
      console.log($scope.tempQuestion);
      return backup.getQuestion();
    };

    $scope.cancelEditedQuestion = function()
    {
      <!--did nothing as cancel did not need to perform any operation right now-->
      $scope.emptyTempquestion();
    };

    $scope.saveEditedQuestion = function(questionNo)
    {

      $scope.questionList[questionNo] = $scope.tempQuestion;
    };


    $scope.deleteQuestion = function(index,number)
    {

    $scope.questionList.splice(index,number);
    };

    $scope.emptyTempquestion = function()
    {
      console.log('try to empty tempQuestion');
      tempQuestion ={
        title : "",
        type : "",
        choice: ["","","",""],
        answer: ""
      };

    };

    $scope.addQuestion = function()
    {
      console.log('addQuestion called');
      <!--consider to delete it-->
      $scope.emptyTempquestion();

      var emptyQuestion ={
        title : "",
        type : "",
        choice: ["","","",""],
        answer: ""
      };
      $scope.questionList.push(emptyQuestion) ;


    };




});
