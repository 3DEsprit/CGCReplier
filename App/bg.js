// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0;
  var utils = new replyCheck.
  var needReplies = new replyCheck.NeedReplies;
  var prefs = new replyCheck.Prefs;
  var pollTime = prefs._pollTime;
  var waitTime = prefs._waitTime;

  var results = document.querySelector('results');

  function initialCheck() {
    needReplies.checkList((out) => {
      console.log('check: ' + out);
    });

    chrome.runtime.sendMessage({action: 'done'}, (response) => {
      console.log(response);
    });
  }

  chrome.runtime.onStartup.addListener(() => {
    initialCheck();
    lastTime = Date.getDate() + (prefs._waitTime * 60000);
    console.log('first check done, and time set');
  });

  chrome.runtime.onMessage.addListener((res) => {
    console.log(res);
    initialCheck();
  });

  function start() {
    console.log('starting!');
  }
  start();
})();
