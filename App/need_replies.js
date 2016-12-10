(function() {
  // add replies to list object
  window.replyCheck = window.replyCheck || {};
  var mainUrl = 'https://cgcookie.com/';
  var utils = new replyCheck.Utils;
  var re = /(?:discussion--item__parent)*(?:<span>)*(?:discussion--reply-count">)(\d{1})/ig;

  replyCheck.NeedReplies = function() {
    this._total = 0;
    this._replyList = [];
    this.mainUrl = 'https://cgcookie.com/';
    this.courses = [
      'course/fundamentals-of-rigging/',
      'course/fundamentals-of-lighting/',
      'course/fundamentals-of-animation/'
    ],
    this.lessons = [];
  };

  replyCheck.NeedReplies.prototype = {
    checkList: function(arr, cb) {
      for(var url of this.courses) {
        var fullUrl = mainUrl + url + '?discussion-page=1#discussion';
        utils.fetchPage(fullUrl, function(out) {
          var match = out.match(re);
          for(var r in match) {
            if(match[r].slice(-1, match[r].length) === '0')
              console.log(arr);
              return arr.push(fullUrl);
          }
        });
      }
      cb();
    },
    setReply: function(reply) {
      console.log('set');
    },
    removeReply: function(reply) {
      console.log('remove');
    },
    findLesson: function(url) {
      console.log('lessons');
      // li lesson-list-item > child a
    },
    forEach: function(cb) {
      for(var key of replyCheck.getNeedReplies()._replyList)
        cb(key);
    }
  };

  replyCheck.getNeedReplies = function() {
    var background = chrome.extension.getBackgroundPage();
    console.log('background: ', background);
    if (!background.replyCheck.hasOwnProperty("needReplies"))
      background.replyCheck.needReplies = new replyCheck.NeedReplies;

    return background.replyCheck.needReplies;
  };
})();
