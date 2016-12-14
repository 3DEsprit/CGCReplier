(function() {
  // add replies to list object
  window.replyCheck = window.replyCheck || {};
  var mainUrl = 'https://cgcookie.com/';
  var utils = new replyCheck.Utils;
  var courseList = replyCheck.getCourses;
  var courses = new replyCheck.Courses;
  var re = /(?:discussion--item__parent)[^]*?(?:<span class="discussion--reply-count">)(\d{1})/ig;
  var urltotal = 0, lessontotal = 0;

  replyCheck.NeedReplies = function() {
    this._total = 0;
    this._questionList = [];
    this.mainUrl = 'https://cgcookie.com/';
    this.lessons = [];
  };

  replyCheck.NeedReplies.prototype = {
    checkList: function(flow, cb) {
      // replyCheck.getNeedReplies()._questionList = [];
      courses[flow].map((url) => {
        let fullUrl = mainUrl + url + '?discussion-page=1#discussion';
        utils.fetchPage(fullUrl, (out) => {
          let match = out.match(re);
          var matchTotal = 0;
          if(match.length) {
            for(var r of match) {
              urltotal++;
              if(r.slice(-1, r.length) === '0') matchTotal += 1;
              if(matchTotal > 0)
                replyCheck.getNeedReplies()._questionList.push(fullUrl);
                courseList()._total += 1;
              if(urltotal === courses[flow].length) cb('ListDone');
              break;
            }
          } else {
            urltotal++;
            if(urltotal === courses[flow].length) cb('ListDone');
          }
        });
      });
    },
    checkLesson: function(flow, cb) {
      console.log('check lessons');
      courseList()[flow + 'Lesson'].map((url) => {
        let fullUrl = mainUrl + url + '?discussion-page=1#discussion';
        utils.fetchPage(fullUrl, (out) => {
          let match = out.match(re);
          var matchTotal = 0;
          if(match !== null) {
            for(var r of match) {
              lessontotal++;
              if(r.slice(-1, r.length) === '0') matchTotal += 1;
              if(matchTotal > 0)
                replyCheck.getNeedReplies()._questionList.push(fullUrl);
                courseList()._total += 1;
              if(lessontotal === courseList()[flow + 'Lesson'].length) cb('LessonDone');
              break;
            }
          } else {
            lessontotal++;
            if(lessontotal === courseList()[flow + 'Lesson'].length) cb('LessonDone');
          }
        });
      });
    },
    forEach: function(cb) {
      replyCheck.getNeedReplies()._questionList.map((key) => {
        cb(key);
      });
    }
  };

  // make single instance for extension
  replyCheck.getNeedReplies = function() {
    var background = chrome.extension.getBackgroundPage();
    if (!background.replyCheck.hasOwnProperty('needReplies'))
      background.replyCheck.needReplies = new replyCheck.NeedReplies;
    return background.replyCheck.needReplies;
  };
})();
