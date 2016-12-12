// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0;
  var utils = new replyCheck.Utils;
  var prefs = new replyCheck.Prefs;
  var courseFirst = replyCheck.getCourses;
  var courses = new replyCheck.Courses;
  var needFirst = replyCheck.getNeedReplies;
  var need = new replyCheck.NeedReplies;

  function grabLinks(flow) {
    for(var course of courses[flow]) {
      var fullUrl = need.mainUrl + course + '#lessons';
      utils.fetchPage(fullUrl, (out) => {
        var re = /(?:lesson-list-item )[^]*?(?:<a href="https:\/\/cgcookie.com\/)lesson\/[a-z\-]*?\//ig;
        let match = out.match(re);
        for(let m of match) {
          var url = /lesson\/[a-z\-]*?\//ig;
          courseFirst()[flow + 'Lesson'].push(m.match(url).toString());
        }
      });
    }
  }
  function initialCheck() {
    needFirst().checkList('Blender', () => {
      needFirst().forEach((out) => {
        console.log(out);
        chrome.runtime.sendMessage({action: 'done'});
      });
    });
  }
  function populateLessons(flow) {
    if(courseFirst()[flow + 'Lesson'].length === 0) grabLinks(flow);
  }
  function start() {
    populateLessons('Blender');
    initialCheck();
  }
  start();
})();
