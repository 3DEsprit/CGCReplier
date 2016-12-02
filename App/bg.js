// background process
(function() {
  var mainUrl = 'https://cgcookie.com/';
  var lessons = [
    'course/fundamentals-of-rigging/#discussion'
  ];
  var data;

  console.log('bg loaded');

  var search = new replyCheck.SearchUrls;
  var url = 'https://cgcookie.com/course/mesh-modeling-fundamentals/#discussion';
  // var timer = 15000;

  function checkPage() {
    return search.fetchPage(url, function(out) {
      data = out;
      console.log('Data: ', data);
    });
  }

  function parsePage(data) {
    var re = '/(?:discussion--item__parent)*(?:<span>)*(?:discussion--reply-count">)(\d{1})/ig';
    var replies = data;
    console.log('Out: ' + data);
    console.log('fetchPage: ', replies);
    return replies;
  }

  function start() {
    console.log(parsePage(checkPage()));
  }

  start();
})();
