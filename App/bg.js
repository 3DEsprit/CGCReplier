// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0;
  var utils = new replyCheck.Utils;
  var prefs = new replyCheck.Prefs;
  var need = new replyCheck.NeedReplies;

  // var results = document.querySelector('results');

  function grabLinks() {
    var courses = replyCheck.getNeedReplies().courses;
    for(var course of courses) {
      var fullUrl = need.mainUrl + course + '?discussion-page=1#discussion';
      utils.fetchPage(fullUrl, (out) => {
        // var li = querySelectorAll('li.lesson-list-item');
        var re = /(?:li\ class\=\"lesson-list-item)*(?:\<a href=")(https:\/\/cgcookie\.com\/lesson\/[a-z\-]*)/ig;
        var match = re.exec(out);
        console.log(match[1]);
      });
    }
  }

  function initialCheck() {
    replyCheck.getNeedReplies().checkList(replyCheck.getNeedReplies()._replyList, () => {
      replyCheck.getNeedReplies().forEach((out) => {
        console.log(out);
        chrome.runtime.sendMessage({action: 'done'});
      });
    });
  }

  function populateLessons() {
    if(replyCheck.getNeedReplies().lessons.length === 0) grabLinks();
  }

  function start() {
    populateLessons();
    initialCheck();
  }
  start();
})();
