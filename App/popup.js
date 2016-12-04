// Stuff
(function() {

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
})();
