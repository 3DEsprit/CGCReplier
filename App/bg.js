// background process
(function() {
  // watch intervals and start searching
  var lastTime = 0, waitTime = 0, pollTime = 15000, message, status, links = 0;
  var utils = new replyCheck.Utils;
  var prefs = new replyCheck.Prefs;
  var courseFirst = replyCheck.getCourses();
  var courses = new replyCheck.Courses;
  var needFirst = replyCheck.getNeedReplies();
  var need = new replyCheck.NeedReplies;

  function grabLinks(flow, cb) {
    console.log('grab Links');
    courses[flow].map((course) => {
      var fullUrl = need.mainUrl + course + '#lessons';
      utils.fetchPage(fullUrl, (out) => {
        var re = /(?:lesson-list-item )[^]*?(?:<a href="https:\/\/cgcookie.com\/)lesson\/[a-z\-]*?\//ig;
        let match = out.match(re);
        match.map((m) => {
          var url = /lesson\/[a-z\-]*?\//ig;
          courseFirst[flow + 'Lesson'].push(m.match(url).toString());
          links++;
          if(links === courses[flow].length) cb('gotLinks');
        });
      });
    });
  }

  function checkFlow(flow, cb) {
    needFirst.checkList(flow, () => {
      cb();
    });
  }

  function checkLessons(flow, cb) {
    console.log('Lessons');
    needFirst.checkLesson(flow, () => {
      cb();
    });
  }

  function populateLessons(flow, cb) {
    if(courseFirst[flow + 'Lesson'].length == 0) grabLinks(flow, (out) => {
      cb();
    });
  }

  function cycleQuestions() {
    needFirst.forEach(() => {
      console.log('cycling through list');
    });
  }

  function badgeUpdate() {
    if(!needFirst._total || needFirst._total === 0) {
      chrome.browserAction.setBadgeText({text: '0'});
    } else if (needFirst._total > 99) {
      chrome.browserAction.setBadgeText({text: '99+'});
    } else {
      chrome.browserAction.setBadgeText({text: needFirst._total.toString()});
    }
    if(needFirst._total !== 0) {
      chrome.browserAction.setBadgeBackgroundColor({color: [185,0,0,255]});
    } else {
      chrome.browserAction.setBadgeBackgroundColor({color: [125,125,225,255]});
    }
  }

  function statusUpdate() {
    prefs._get('notifications', (store) => {
      status = store;
    });
    console.log('Status: ' + status);
    if(status) {
      if(total > 0) {
        message = ' questions unanswered on the site right now.';
      } else {
        message = ' messages! Relax, and enjoy a cup of coffee.'
      }
      chrome.notifications.create('basic', {
        icon: chrome.extension.getURL('icon.png'),
        body: needFirst._total + message
      });
    }
  }

  function initialCheck(flow) {
    populateLessons(flow, () => {
      checkFlow(flow, () => {
        checkLessons(flow, () => {
          badgeUpdate();
        });
      });
    });
  }

  function checkQuestions() {
    // initialCheck('Blender');
    addTime(waitTime);
  }

  function addTime(time) {
    var date = new Date();
    lastTime = date.setMinutes(date.getMinutes() + time);
    console.log('Lasttime: ' + lastTime, 'Time: ' + date);
  }

  function updateList() {
    console.log('updating list');

    var oldTime = waitTime;
    prefs._get('waitTime', (store) => {
      waitTime = store;
    });

    if(waitTime !== oldTime) {
      console.log('reset interval');
      // checkQuestions();
      addTime(waitTime);
    }

    console.log(' Wait: ' + waitTime + ' Time: ' + Date.now() +
      ' Last: ' + lastTime);

    if(lastTime === 0) {
      checkQuestions();
    } else if(lastTime >= Date.now()) {
      checkQuestions();
      addTime(waitTime);
    }
  }

  var checkTime = setInterval(updateList, pollTime);

  function start() {
    updateList();
  }
  start();
})();
