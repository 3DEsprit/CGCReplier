(function() {

  window.replyCheck = window.replyCheck || {};

  replyCheck.OpenReplies = function() {
    this._replies = {};
    this._eventCb = null;
  }

  replyCheck.OpenReplies.prototype = {
    forEach: function(cb) {
      for (var key in this._replies)
        cb(this._replies[key]);
        console.log(this._replies);
    }
  };

  replyCheck.getQuestions = function() {
    var bg = chrome.extension.getBackgroundPage();
    if (!bg.replyCheck.hasOwnProperty("openReplies"))
      bg.replyCheck.openReplies = new replyCheck.OpenReplies;
    return bg.replyCheck.openReplies;
  };

})();
