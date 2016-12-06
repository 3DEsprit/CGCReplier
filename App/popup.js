// Stuff
(function() {
  // list replies and add in list. Grab titles
  console.log('popup loaded');

  var openReplies = new replyCheck.OpenReplies._replies;

  var table = document.querySelector('#results');

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

  function test() {
    console.log('received');
  }

})();
