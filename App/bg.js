// background process
// Load DOM Data
(function() {
  var mainUrl = 'https://cgcookie.com/';
  var lessons = [
    'course/fundamentals-of-rigging/#discussion'
  ];

  console.log('bg loaded');

  var search = new replyCheck.SearchUrls;
  var url = 'https://cgcookie.com/course/mesh-modeling-fundamentals/#discussion';

  search.callConsole('Background!');

  // test.getPage(url);
  // test.fetchPage(url);

  var timer = 15000;

  function checkPage() {
    search.fetchPage(url, function(out) {
      console.log('fetchPage: ', out);
      chrome.browserAction.setTitle({title:out});
    });
    setTimeout(checkPage, timer);
  }

  function start() {
    checkPage();
  }

  start();
})();
