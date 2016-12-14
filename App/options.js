// option handlersjj

(function() {
  // change interval and reply list types
  var console = chrome.extension.getBackgroundPage().console;
  window.replyCheck = window.replyCheck || {};

  var prefs = new replyCheck.Prefs;

  function start() {
    var Blender = document.getElementById('blenderBox');
    prefs._get('Blender', (useFlow) => {
      Blender.checked = useFlow;
      Blender.addEventListener('click', () => {
        prefs._set('Blender', Blender.checked);
      });
    });
    var Concept = document.getElementById('conceptBox');
    prefs._get('Concept', (useFlow) => {
      Concept.checked = useFlow;
      Concept.addEventListener('click', () => {
        prefs._set('Concept', Concept.checked);
      });
    });
    var Sculpt = document.getElementById('sculptBox');
    prefs._get('Sculpt', (useFlow) => {
      Sculpt.checked = useFlow;
      Sculpt.addEventListener('click', () => {
        prefs._set('Sculpt', Sculpt.checked);
      });
    });
    var Unity = document.getElementById('unityBox');
    prefs._get('Unity', (useFlow) => {
      Unity.checked = useFlow;
      Unity.addEventListener('click', () => {
        prefs._set('Unity', Unity.checked);
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
