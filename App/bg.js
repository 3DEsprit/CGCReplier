// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0, message, status, links = 0;
  var utils = new replyCheck.Utils;
  var prefs = new replyCheck.Prefs;
  var courseFirst = replyCheck.getCourses;
  var courses = new replyCheck.Courses;
  var needFirst = replyCheck.getNeedReplies;
  var need = new replyCheck.NeedReplies;
  var total = needFirst._total;

  function grabLinks(flow, cb) {
    console.log('grab Links');
    courses[flow].map((course) => {
      var fullUrl = need.mainUrl + course + '#lessons';
      utils.fetchPage(fullUrl, (out) => {
        var re = /(?:lesson-list-item )[^]*?(?:<a href="https:\/\/cgcookie.com\/)lesson\/[a-z\-]*?\//ig;
        let match = out.match(re);
        match.map((m) => {
          var url = /lesson\/[a-z\-]*?\//ig;
          courseFirst()[flow + 'Lesson'].push(m.match(url).toString());
          links++;
          if(links === courses[flow].length) cb('gotLinks');
        });
      });
    });
  }

  function checkFlow(flow, cb) {
    console.log('Courses');
    needFirst().checkList(flow, (out) => {
      console.log('CheckFlow: ' + out);
      cb('checkFlow done');
    });
  }

  function checkLessons(flow, cb) {
    console.log('Lessons');
    needFirst().checkLesson(flow, (out) => {
      console.log('CheckLesson: ' + out);
      cb('checkLessons done');
    });
  }

  function populateLessons(flow, cb) {
    if(courseFirst()[flow + 'Lesson'].length == 0) grabLinks(flow, (out) => {
      console.log('GrabLinks: ' + out);
      cb('grabLinks done');
    });
  }

  function cycleQuestions() {
    needFirst().forEach(() => {
      console.log('cycling through list');
    });
  }

  function badgeUpdate() {
    console.log('Update badge ');
    prefs._get('notifications', (store) => {
      status = store;
    });
    if(status) {
      chrome.browserAction.setBadgeText({text: total});
      if(total == 0) {
        chrome.browserAction.setBadgeBackgroundColor({color: [255,0,0,255]});
      } else {
        chrome.browserAction.setBadgeBackgroundColor({color: [0,225,0,255]});
      }
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

  function initialCheck(flow) {
    populateLessons(flow, (out) => {
      console.log(out);
      checkFlow(flow, (out) => {
        console.log(out);
        checkLessons(flow, (out) => {
          console.log(out);
        });
      });
    });
  }

  function start() {
    initialCheck('Blender');
  }
  start();
})();
