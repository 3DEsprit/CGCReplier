// background process
(function() {
  // watch intervals and start searching
  var searchState = 0, lastTime = 0;
  // var search = new replyCheck.SearchUrls;
  var NeedReplies = new replyCheck.NeedReplies;

  var results = document.querySelector('results');

  function initialCheck() {
    NeedReplies.checkList((out) => {
      console.log('check: ' + out);
    });
  }

  if(lastTime === 0) {
    console.log('startup triggered');
    initialCheck();
  } else {

  }

  function start() {
    console.log('starting!');
  }
  start();
})();
