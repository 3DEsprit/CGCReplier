// background process
(function() {
  // watch intervals and start searching
  // var searchState = 0, lastTime = 0;
  // var utils = new replyCheck.Utils;
  // var prefs = new replyCheck.Prefs;
  // var open = new replyCheck.OpenReplies;
  // var pollTime = prefs._pollTime;
  // var waitTime = prefs._waitTime;

  // var results = document.querySelector('results');

  function initialCheck() {
    replyCheck.getNeedReplies().checkList(replyCheck.getNeedReplies()._replyList, () => {
      replyCheck.getNeedReplies().forEach((out) => {
        console.log(out);
        chrome.runtime.sendMessage({action: 'done'});
      });
    });
  }

  function start() {
    initialCheck();
  }
  start();
})();
