// background process
// Load DOM Data
(function() {
  var mainUrl = 'https://cgcookie.com/';
  var lessons = [
    'course/fundamentals-of-rigging/#discussion'
  ];
  var timer = 15000;
  // var lastRun;

  // function getQuestionTime(cb, type) {
  //   replyCheck.fetchPage(mainUrl + lessons[0], 'text', function(text) {
  //     var questions = JSON.parse(text);
  //
  //     for (var i = 0; i < questions.length; i++) {
  //       if (questions[i].general_state == type) {
  //         cb(new Date(questions[i].date + ' UTC'));
  //         return;
  //       }
  //     }
  //   });
  // }

  // function updateStatus(status) {
  //   chrome.browserAction.setTitle({title:status});
  //
  //   // if (lastRun === undefined) {
  //   //   getQuestionTime(function(time) {
  //   //     lastRun = time;
  //   //   });
  //   // }
  // }

  function checkPage() {
    replyCheck.fetchPage(mainUrl + lessons[0], 'text', function(out) {
      console.log('fetchPage: ', out);
      chrome.browserAction.setTitle({title:out});
    });
    setTimeout(checkPage, timer);
  }

  function start() {
    checkPage();
  }

  start();
})();
