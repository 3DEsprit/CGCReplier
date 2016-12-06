// background process
(function() {
  // watch intervals and start searching
  var mainUrl = 'https://cgcookie.com/';
  var lessons = [
    'course/fundamentals-of-rigging/#discussion'
  ];
  var openReplies = new replyCheck.OpenReplies._replies;

  console.log('bg loaded');

  var search = new replyCheck.SearchUrls;
  var url = 'https://cgcookie.com/course/mesh-modeling-fundamentals/#discussion';
  var results = document.querySelector('results');
  // var timer = 15000;

  function checkPage() {
    return search.fetchPage(url, function(out) {
      var re = /(?:discussion--item__parent)*(?:<span>)*(?:discussion--reply-count">)(\d{1})/ig;
      // console.log(out);
      console.log('Type: ' + (typeof out));
      var matches = out.match(re);
      console.log('Replies: ', matches);
      for(var r in matches) {
        if(matches[r].slice(-1, matches[r].length) === '0')
          console.log(r + ' is Zero!');
          replies._replies = {url: url};
      }
    });
  }
  chrome.runtime.onMessage.addListener((req, from, res) => {
    if(!req.action) {
      console.log('Action:' + req.action);
      console.log(req, from, res);
      console.log('Open: ', openReplies);
    }
  });

  function start() {
    console.log('starting!');
    checkPage();
  }
  start();
})();
