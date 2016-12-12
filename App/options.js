// option handlersjj

(function() {
  // change interval and reply list types
  window.replyCheck = window.replyCheck || {};

  var prefs = replyCheck.Prefs;

  function start() {
    var blender = document.getElementById('#blender');
    prefs.getFlow('blender', (useFlow) => {
      blender.checked = useFlow;
      blender.addEventListener('click', () => {
        prefs.setFlow('blender', blender.checked);
      });
    });
    var concept = document.getElementById('#concept');
    prefs.getFlow('concept', (useFlow) => {
      concept.checked = useFlow;
      concept.addEventListener('click', () => {
        prefs.setFlow('concept', concept.checked);
      });
    });
    var sculpt = document.getElementById('#sculpt');
    prefs.getFlow('sculpt', (useFlow) => {
      sculpt.checked = useFlow;
      sculpt.addEventListener('click', () => {
        prefs.setFlow('sculpt', sculpt.checked);
      });
    });
    var unity = document.getElementById('#unity');
    prefs.getFlow('unity', (useFlow) => {
      unity.checked = useFlow;
      unity.addEventListener('click', () => {
        prefs.setFlow('unity', unity.checked);
      });
    });
    var notif = document.getElementById('#notifications', () => {

    });
    var waitTime = document.getElementById('', () => {

    });
  }
})();
