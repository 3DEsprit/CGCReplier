// deal with options
(function() {
  window.replyCheck = window.replyCheck || {};

  replyCheck.Prefs = function() {
    this._pollTime = 15000;
    this._waitTime = 15;
    this._prefs = {
      blender: true,
      concept: true,
      sculpt: true,
      unity: true
    }
  };

  replyCheck.Prefs.prototype = {
    _get: function(key, cb) {
      chrome.storage.sync.get(this._defaults, (store) => {
        cb(store.prefs[key]);
      });
    },
    _set: function(key, val) {
      chrome.storage.sync.get(this._defaults, (store) => {
        store.prefs[key] = val;
      });
    },
    getAlerts: function(callback) {
      this._get('use_notifications', callback);
    },
    setAlerts: function(use_notifications) {
      this._set('use_notifications', use_notifications);
    }
  };

})();
