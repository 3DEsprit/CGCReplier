// option handlersjj

(function() {
  // change interval and reply list types
  var console = chrome.extension.getBackgroundPage().console;
  window.replyCheck = window.replyCheck || {};

  var prefs = new replyCheck.Prefs;

  function start() {
    var blender = document.getElementById('blenderBox');
    prefs._get('blender', (useFlow) => {
      blender.checked = useFlow;
      blender.addEventListener('click', () => {
        prefs._set('blender', blender.checked);
      });
    });
    var concept = document.getElementById('conceptBox');
    prefs._get('concept', (useFlow) => {
      concept.checked = useFlow;
      concept.addEventListener('click', () => {
        prefs._set('concept', concept.checked);
      });
    });
    var sculpt = document.getElementById('sculptBox');
    prefs._get('sculpt', (useFlow) => {
      sculpt.checked = useFlow;
      sculpt.addEventListener('click', () => {
        prefs._set('sculpt', sculpt.checked);
      });
    });
    var unity = document.getElementById('unityBox');
    prefs._get('unity', (useFlow) => {
      unity.checked = useFlow;
      unity.addEventListener('click', () => {
        prefs._set('unity', unity.checked);
      });
    });
    var notif = document.getElementById('notifications');
    prefs._get('notifications', (notes) => {
      notif.checked = notes;
      notif.addEventListener('click', () => {
        prefs._set('notifications', notif.checked);
      });
    });
    var waitTime = document.getElementById('timer');
    prefs._get('waitTime', (timer) => {
      waitTime.value = timer;
      waitTime.addEventListener('change', () => {
        prefs._set('waitTime', waitTime.value);
      });
    });
  }
  start();
})();
