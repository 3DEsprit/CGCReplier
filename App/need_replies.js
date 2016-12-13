(function() {
  // add replies to list object
  window.replyCheck = window.replyCheck || {};
  var mainUrl = 'https://cgcookie.com/';
  var utils = new replyCheck.Utils;
  var courseList = replyCheck.getCourses;
  var courses = new replyCheck.Courses;
  var re = /(?:discussion--item__parent)[^]*?(?:<span class="discussion--reply-count">)(\d{1})/ig;

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
          match.map((r) => {
            if(r.slice(-1, r.length) === '0') matchTotal += 1;
          });
          if(matchTotal > 0) replyCheck.getNeedReplies()._questionList.push(fullUrl);
          this._total += 1;
        });
      });
      cb();
    },
    checkLesson: function(flow) {
      console.log('check lessons');
      for(let url of courseList()[flow + 'Lesson']) {
        let fullUrl = mainUrl + url + '?discussion-page=1#discussion';
        utils.fetchPage(fullUrl, (out) => {
          let match = out.match(re);
          var matchTotal = 0;
          for(let r in match) {
            if(match[r].slice(-1, match[r].length) === '0') matchTotal += 1;
          }
          if(matchTotal > 0) replyCheck.getNeedReplies()._questionList.push(fullUrl);
          this._total += 1;
        });
      }
    },
    forEach: function(cb) {
      for(var key of replyCheck.getNeedReplies()._questionList)
        cb(key);
    }
  };

  // make single instance for extension
  replyCheck.getNeedReplies = function() {
    var background = chrome.extension.getBackgroundPage();
    if (!background.replyCheck.hasOwnProperty("needReplies"))
      background.replyCheck.needReplies = new replyCheck.NeedReplies;
    return background.replyCheck.needReplies;
  };
})();
