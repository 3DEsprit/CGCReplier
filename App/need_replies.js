(function() {
  console.log('NeedReplies loaded');
  // add replies to list object
  window.replyCheck = window.replyCheck || {};

  var open = new replyCheck.OpenReplies;
  var search = new replyCheck.SearchUrls;
  var re = /(?:discussion--item__parent)*(?:<span>)*(?:discussion--reply-count">)(\d{1})/ig;

  replyCheck.NeedReplies = function() {
    this._total = 0;
    this.list = [];
  };

  replyCheck.NeedReplies.prototype = {
    checkList: function() {
      for(var url in this.list) {
        search.fetchPage(url, function(out) {
          var matches = out.match(re);
          for(var r in matches) {
            if(matches[r].slice(-1, matches[r].length) === '0')
              open._replies.push(url);
          }
        });
      }
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
