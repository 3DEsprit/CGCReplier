(function() {
  console.log('NeedReplies loaded');
  // add replies to list object
  window.replyCheck = window.replyCheck || {};
  var mainUrl = 'https://cgcookie.com/';

  var open = new replyCheck.OpenReplies;
  var utils = new replyCheck.Utils;
  var re = /(?:discussion--item__parent)*(?:<span>)*(?:discussion--reply-count">)(\d{1})/ig;

  replyCheck.NeedReplies = function() {
    this._total = 0;
    this.mainUrl = 'https://cgcookie.com/';
    this.lessons = [
      'course/fundamentals-of-rigging/',
      'course/fundamentals-of-lighting/'
    ];
  };

  replyCheck.NeedReplies.prototype = {
    checkList: function(cb) {
      for(var url of this.lessons) {
        var fullUrl = this.mainUrl + url + '#discussion';
        utils.fetchPage(fullUrl, function(out) {
          var matches = out.match(re);
          for(var r in matches) {
            if(matches[r].slice(-1, matches[r].length) === '0')
              open._replies.push(url);
          }
        });
      }
      cb(open._replies);
    },
    setReply: function(reply) {
      console.log('set');
    },
    removeReply: function(reply) {
      console.log('remove');
    },
    findLesson: function(url) {

    }
  };
})();
