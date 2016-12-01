// option handlers

(function() {
  window.replyCheck = window.replyCheck || {};

  var prefs = replyCheck.Prefs;

  function start() {
    var noteBox = document.getElementById('notifications');
    prefs.getAlerts(function(useNotes) {
      noteBox.checked = useNotes;
      noteBox.addEventListener('click', function() {
        prefs.setAlerts(noteBox.checked);
      });
    });

    var courseBox = document.QuerySelector('');

  }
})();
