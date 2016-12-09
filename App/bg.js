// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0;
  var utils = new replyCheck.Utils;
  var need = new replyCheck.NeedReplies;
  var prefs = new replyCheck.Prefs;
  var pollTime = prefs._pollTime;
  var waitTime = prefs._waitTime;

  var results = document.querySelector('results');

  function initialCheck() {
    need.checkList((out) => {
      chrome.runtime.sendMessage({action: 'done'});
    });
  }

  function start() {
    initialCheck();
  }
  start();
})();
