(function() {
  // reply list getter/setter
  console.log('open loaded');
  window.replyCheck = window.replyCheck || {};

  replyCheck.OpenReplies = function() {
    this._replies = {};
  }

  replyCheck.OpenReplies.prototype = {
    forEach: function(cb) {
      for (var key in this._replies)
        cb(this._replies[key]);
        console.log(this._replies);
    },
    setReply: function(reply) {
      var result = document.createElement('LI');
      // var text = document.createNode('Test');
      result.appendChild(replies[r]);
    },
    removeReply: function(reply) {
      // remove
    },
    findReply: function(reply) {
      // find?
    }
  };

  replyCheck.getQuestions = function() {
    var bg = chrome.extension.getBackgroundPage();
    if (!bg.replyCheck.hasOwnProperty("openReplies"))
      bg.replyCheck.openReplies = new replyCheck.OpenReplies;
    return bg.replyCheck.openReplies;
  };
})();
