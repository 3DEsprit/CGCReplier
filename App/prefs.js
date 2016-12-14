// deal with options
(function() {
  var console = chrome.extension.getBackgroundPage().console;
  window.replyCheck = window.replyCheck || {};

  replyCheck.Prefs = function() {
    this._settings = {
      options: {
        pollTime: 15000,
        waitTime: 15,
        notifications: false,
        Blender: false,
        Concept: false,
        Sculpt: false,
        Unity: false
      }
    }
  };

  replyCheck.Prefs.prototype = {
    _get: function(key, cb) {
      chrome.storage.sync.get(this._settings, (store) => {
        cb(store.options[key]);
      });
    },
    _set: function(key, val) {
      chrome.storage.sync.get(this._settings, (store) => {
        store.options[key] = val;
        chrome.storage.sync.set(store);
      });
    }
  };
})();
