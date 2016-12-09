(function() {
  // background script
  // reply list getter/setter and list
  window.replyCheck = window.replyCheck || {};

  // Adding methods and array to object
  replyCheck.OpenReplies = function() {
    this._replies = [];
  }

  replyCheck.OpenReplies.prototype = {
    forEach: function(cb) {
      for (var key in this._replies)
        cb(this._replies[key]);
    },
    setReply: function(replies) {
      result.appendChild(replies[r]);
    },
    removeReply: function(reply) {
      // remove
    },
    findReply: function(reply) {
      // find?
    }
  };
})();
