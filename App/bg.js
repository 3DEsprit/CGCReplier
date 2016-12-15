// background process
(function() {
  // watch intervals and start searching
  var nextTime, lastTime, waitTime = 0, pollTime = 15000, message, status, links = 0, checkTime, flash, badgeColor = true;
  var utils = new replyCheck.Utils;
  var prefs = new replyCheck.Prefs;
  var courseFirst = replyCheck.getCourses();
  var courses = new replyCheck.Courses;
  var needFirst = replyCheck.getNeedReplies();
  var need = new replyCheck.NeedReplies;

  function grabLinks(flow, cb) {
    for(let course of courses[flow]) {
      var fullUrl = need.mainUrl + course + '#lessons';
      utils.fetchPage(fullUrl, (out) => {
        var re = /(?:lesson-list-item )[^]*?(?:<a href="https:\/\/cgcookie.com\/)lesson\/[a-z\-]*?\//ig;
        let match = out.match(re);
        links++;
        for(let m of match) {
          var url = /lesson\/[a-z\-]*?\//ig;
          courseFirst[flow + 'Lesson'].push(m.match(url).toString());
          if(links === courses[flow].length && m === match[match.length -1]) { cb('linksDone'); }
        }
      });
    }
  }

  function populateLessons(flow, cb) {
    if(courseFirst[flow + 'Lesson'].length === 0) {
      grabLinks(flow, (out) => {
        if(out === 'linksDone') cb();
      });
    } else {
      cb();
    }
  }

  function flashBadge() {
    flash = setInterval(() => {
      if(badgeColor) {
        chrome.browserAction.setBadgeText({text: '/'});
        chrome.browserAction.setBadgeBackgroundColor({color: [245, 245, 255, 255]});
        badgeColor = false;
      } else if(!badgeColor) {
        chrome.browserAction.setBadgeText({text: '\\'});
        chrome.browserAction.setBadgeBackgroundColor({color: [225, 255, 225, 255]});
        badgeColor = true;
      }
    }, 500);
  }


  function badgeUpdate() {
    console.log('Update badge');
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
    console.log('update notification status');
    prefs._get('notifications', (store) => {
      status = store;
      if(status && nextTime) {
        if(needFirst._total > 0) {
          var message = ' questions unanswered.';
          var notification = new Notification('CGCookie Questions', {
            icon: chrome.extension.getURL('icon.png'),
            body: needFirst._total.toString() + message
          });
        }
      }
    });
  }

  function initialCheck(flow, cb) {
      prefs._get(flow, (store) => {
        if(store) {
          populateLessons(flow, () => {
            need.checkList(flow, () => {
              need.checkLesson(flow, () => {
                console.log('Done! ' + flow);
                cb();
              });
            });
          });
        } else {
          console.log('Skipping ' + flow);
          cb();
        }
    });
  }

  function checkQuestions() {
    flashBadge();
    initialCheck('Blender', () => {
      initialCheck('Concept', () => {
        initialCheck('Sculpt', () => {
          initialCheck('Unity', () => {
            console.log('All done!');
            clearInterval(flash);
            badgeUpdate();
            addTime(waitTime);
            statusUpdate();
          });
        });
      });
    });
  }

  function addTime(time) {
    console.log('addTime');
    lastTime = new Date();
    nextTime = lastTime.getTime() + time * 60000;
  }

  function updateList() {
    let oldTime = waitTime;
    prefs._get('waitTime', (store) => {
      waitTime = store;
      if(waitTime === 0) { waitTime = 15; }
      if(waitTime !== oldTime) {
        console.log('reset');
        clearInterval(checkTime);
        checkTime = setInterval(updateList, pollTime);
        checkQuestions();
      }
    });

    if(nextTime !== undefined) {
      if(Date.now() >= nextTime) {
        console.log('timeout');
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
