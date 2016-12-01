// Stuff
(function() {

  var status;

  // Send Results to Pop Up

  function render(status) {
    document.getElementById('status').textContent = status;
  }

  function createQuestionElement(question) {
    var table = document.createElement('div');
    table.className = 'questions';

    var qAnchor = document.createElement('a');
    qAnchor.textContent = ' ';
    qAnchor.className = 'question';
    qAnchor.target = '_blank';
    table.appendChild(qAnchor);

    return table;
  }

  // Find Questions without Replies

})();
