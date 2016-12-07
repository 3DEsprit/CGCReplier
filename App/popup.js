(function() {
  // Popup Content Script
  console.log('Popup loaded');

  // call object from background here
  var open = new replyCheck.OpenReplies;
  var div = document.querySelector('#results');

  function createQuestionLink(q) {
    var div = document.createElement('div');
    div.className = 'questions';
    var a = document.createElement('a');
    a.className = 'question';
    a.target = '_blank';
    a.src = q.url;
    div.appendChild(a);

    return div;
  }

  // calling array from Object and output to console
  function searchList() {
    open._replies.map((out) => {
      console.log(out);
    });
  }

  function start() {
    console.log('Starting Popup ' + chrome.app.getDetails().version);
    searchList();
  }
  start();
})();
