(function() {
  // add replies to list object
  window.replyCheck = window.replyCheck || {};
  var mainUrl = 'https://cgcookie.com/';
  var match;
  var open = new replyCheck.OpenReplies;
  var utils = new replyCheck.Utils;
  var re = /(?:discussion--item__parent)*(?:<span>)*(?:discussion--reply-count">)(\d{1})/ig;

  replyCheck.NeedReplies = function() {
    this._total = 0;
    this.mainUrl = 'https://cgcookie.com/';
    this.courses = [
      'course/fundamentals-of-rigging/',
      'course/fundamentals-of-lighting/',
      'course/fundamentals-of-animation/'
    ],
    this.lessons = [];
  };

  replyCheck.NeedReplies.prototype = {
    checkList: function(cb) {
      open._replies = [];
      for(var url of this.courses) {
        var fullUrl = this.mainUrl + url + '#discussion';
        utils.fetchPage(fullUrl, function(out) {
          var match = out.match(re);
          for(var r in match) {
            if(match[r].slice(-1, match[r].length) === '0')
              open._replies.push(url);
              console.log(open._replies);
              return;
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
    }
  };
})();
