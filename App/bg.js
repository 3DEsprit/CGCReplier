// background process
(function() {
  // watch intervals and start searching
  var nextTime, lastTime, waitTime = 0, pollTime = 15000, message, status, links = 0, checkTime, topicArray = [];
  var topicList = ['Blender', 'Concept', 'Sculpt', 'Unity'];
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
    console.log('status update');
    prefs._get('notifications', (store) => {
      status = store;
      console.log('Status: ' + status);
      if(status && nextTime) {
        if(needFirst._total > 0) {
          message = ' questions unanswered on the site right now.';
        } else {
          message = ' messages! Relax, and enjoy a cup of coffee.';
        }
        var notification = new Notification('CGCookie Questions', {
          icon: chrome.extension.getURL('icon.png'),
          body: needFirst._total + message
        });
      }
    });
  }

  function initialCheck(flow, cb) {
    populateLessons(flow, () => {
      checkFlow(flow, () => {
        checkLessons(flow, () => {
          badgeUpdate();
          cb();
        });
      });
    });
  }

  function prefCheck(cb) {
    var iteration = 0;
    for(let topic of topicList) {
      prefs._get(topic, (store) => {
        iteration++;
        if(store) topicArray.push(topic);
        if(iteration === topicList.length) cb(topicArray);
      });
    }
  }

  function checkQuestions() {
    prefCheck((topicArray) => {
      var count = 0;
      for(let flow of topicArray) {
        count++;
        initialCheck(flow, () => {
          if(count === topicArray.length) {
            addTime(waitTime);
            statusUpdate();
          }
        });
      }
    });
  }

  function addTime(time) {
    lastTime = new Date();
    nextTime = lastTime.getTime() + time * 60000;
    console.log('Current Time: ' + Date.now(), ' Next Time: ' + nextTime);
  }

  function updateList() {
    let oldTime = waitTime;
    prefs._get('waitTime', (store) => {
      waitTime = store;
      if(waitTime !== oldTime) {
        console.log('reset interval');
        clearInterval(checkTime);
        checkTime = setInterval(updateList, pollTime);
        console.log('Reset: updating list');
        checkQuestions();
      }
    });

    if(nextTime !== undefined) {
      console.log(' Wait: ' + waitTime + ' Time: ' + Date.now() +
        ' Next: ' + nextTime);

      if(Date.now() >= nextTime) {
        console.log('Timeout: updating list');
        checkQuestions();
      }
    }
  }

  checkTime = setInterval(updateList, pollTime);

  function start() {
    updateList();
  }
  start();
})();
