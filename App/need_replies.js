(function() {
  // add replies to list object
  window.replyCheck = window.replyCheck || {};
  var mainUrl = 'https://cgcookie.com/';
  var utils = new replyCheck.Utils;
  var courseList = replyCheck.getCourses();
  var courses = new replyCheck.Courses;
  var re = /(?:discussion--item__parent)[^]*?(?:<span class="discussion--reply-count">)(\d{1})/ig;
  var urltotal = 0, lessontotal = 0;

  replyCheck.NeedReplies = function() {
    this._total = 0;
    this._questionList = {
      Blender: [],
      Concept: [],
      Sculpt: [],
      Unity: []
    };
    this.mainUrl = 'https://cgcookie.com/';
  };

  replyCheck.NeedReplies.prototype = {
    checkList: function(flow, cb) {
      courses[flow + 'Lesson'] = [];
      for(let url of courses[flow]) {
        let fullUrl = mainUrl + url + '?discussion-page=1#discussion';
        utils.fetchPage(fullUrl, (out) => {
          if(out) {
            let match = out.match(re);
            var matchTotal = 0;
            if(match === null) {
              urltotal++;
              if(urltotal === courses[flow].length) { cb(); }
            } else if(match.length) {
              urltotal++;
              for(var r of match) {
                if(r.slice(-1, r.length) === '0') { matchTotal += 1; }
                if(matchTotal > 0)
                  courses[flow + 'Lesson'].push(fullUrl);
                if(urltotal === courses[flow].length) { cb(); }
                break;
              }
            } else {
              urltotal++;
              if(urltotal === courses[flow].length) { cb(); }
            }
          }
        });
      }
    },
    checkLesson: function(flow, cb) {
      for(let url of courseList[flow + 'Lesson']) {
        let fullUrl = mainUrl + url + '?discussion-page=1#discussion';
        utils.fetchPage(fullUrl, (out) => {
          let match = out.match(re);
          var matchTotal = 0;
          if(match === null) {
            lessontotal++;
            if(lessontotal === courseList[flow + 'Lesson'].length) {
              debugger;
              cb();
            }
          } else if(match.length) {
            lessontotal++;
            for(let r of match) {
              if(r.slice(-1, r.length) === '0') { matchTotal += 1; }
              if(matchTotal > 0) {
                replyCheck.getNeedReplies()._questionList[flow].push(fullUrl);
                if(lessontotal === courseList[flow + 'Lesson'].length && matchTotal > 0 ||
                  lessontotal === courseList[flow + 'Lesson'].length && r === match[match.length - 1]) {
                  replyCheck.getNeedReplies()._total += replyCheck.getNeedReplies()._questionList[flow].length;
                  cb();
                }
                break;
              }
            }
          } else {
            lessontotal++;
            if(lessontotal === courseList[flow + 'Lesson'].length) {
              cb();
            }
          }
        });
      }
    },
    forEach: function(flow, cb) {
      replyCheck.getNeedReplies()._questionList[flow].map((key) => {
        cb(key);
      });
    }
  };

  // make single instance for extension
  replyCheck.getNeedReplies = function() {
    var background = chrome.extension.getBackgroundPage();
    if (!background.replyCheck.hasOwnProperty('needReplies')) {
      background.replyCheck.needReplies = new replyCheck.NeedReplies;
    }
    return background.replyCheck.needReplies;
  };
})();
