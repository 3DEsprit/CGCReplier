// background process
(function() {
  // watch intervals and start searching
  var mainUrl = 'https://cgcookie.com/';
  var lessons = [
    'course/fundamentals-of-rigging/#discussion'
  ];

  var search = new replyCheck.SearchUrls;
  var url = 'https://cgcookie.com/course/mesh-modeling-fundamentals/#discussion';
  var results = document.querySelector('results');

  function start() {
    console.log('starting!');
    checkPage();
  }
  start();
})();
