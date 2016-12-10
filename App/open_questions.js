(function() {
  // background script
  // reply list getter/setter and list
  window.replyCheck = window.replyCheck || {};

  // Adding methods and array to object
  replyCheck.OpenReplies = function() {
    this._replies = replyCheck.getNeedReplies()._replyList;
  }

  replyCheck.OpenReplies.prototype = {
    forEach: function(cb) {
      // for (var reply of need._replyList)
        cb(this._replyList);
    },
    setReply: function(replies) {
      // set
    },
    removeReply: function(reply) {
      // remove
    },
    findReply: function(reply) {
      // find?
    }
  };
})();
