(function() {
  console.log('need loaded');
  // add replies to list object
  window.replyCheck = window.replyCheck || {};

  replyCheck.NeedReplies = function() {
    this._total = 0;
  };

  replyCheck.NeedReplies.prototype = {
    setReply: function(reply) {
      console.log('set');
    },
    removeReply: function(reply) {
      console.log('remove');
    },
    findReply: function(reply) {
      console.log('find');
    }
  };
})();
