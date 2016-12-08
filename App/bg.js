// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0;
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
    if(lastTime === 0) {
      console.log('startup triggered');
      initialCheck();
      lastTime = Date.getDate() + (prefs._waitTime * 60000);
      console.log('lastTime');
    }
  });

  setInterval()
  if(lastTime) {

  }

  chrome.runtime.onMessage.addListener((res) => {
    console.log(res);
    initialCheck();
  });

  function start() {
    console.log('starting!');
  }
  start();
})();
