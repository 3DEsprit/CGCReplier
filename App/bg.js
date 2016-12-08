// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0;
  // var search = new replyCheck.SearchUrls;
  var needReplies = new replyCheck.NeedReplies;
  var prefs = new replyCheck.Prefs;

  var results = document.querySelector('results');

  function initialCheck() {
    needReplies.checkList((out) => {
      console.log('check: ' + out);
    });
  }

  if(lastTime === 0) {
    console.log('startup triggered');
    initialCheck();
    lastTime === prefs._defaults.prefs.waitTime;
  }

  function testStore() {
    console.log(chrome.storage.sync);
  }

  function start() {
    console.log('starting!');
  }
  start();
})();
