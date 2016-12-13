// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0, message;
  var utils = new replyCheck.Utils;
  var prefs = new replyCheck.Prefs;
  var courseFirst = replyCheck.getCourses;
  var courses = new replyCheck.Courses;
  var needFirst = replyCheck.getNeedReplies;
  var need = new replyCheck.NeedReplies;
  var total = replyCheck.NeedReplies()._total;

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
  function initialCheck(cb) {
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
  function badgeUpdate() {
    chrome.browserAction.setBadgeText({text: total});
    if(total === 0) {
      chrome.browserAction.setBadgeBackgroundColor({color: [255,0,0,255]});
    } else {
      chrome.browserAction.setBadgeBackgroundColor({color: [0,225,0,255]});
    }
  }

  function statusUpdate() {
    if(total > 0) {
      message = ' questions unanswered on the site right now.';
    } else {
      message = ' messages! Relax, and enjoy a cup of coffee.'
    }
    chrome.notifications.create('basic', {
      icon: chrome.extension.getURL('icon.png'),
      body: total + message
    });
  }

  function start() {
    populateLessons('Blender');
    initialCheck((done) => {
      badgeUpdate();
      prefs._get('notifications', (store) => {
        let status = store;
        if(status) statusUpdate();
      });
    });
  }
  start();
})();
