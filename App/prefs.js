// deal with options
(function() {
  console.log('prefs loaded');
  window.replyCheck = window.replyCheck || {};

  replyCheck.Prefs = function() {
    this._defaults = {prefs: {
      blender: true,
      concept: true,
      sculpt: true,
      unity: true
    }};
  };

  replyCheck.Prefs.prototype = {
    _get: function(key, cb) {
      chrome.storage.sync.get(this._defaults, function(store) {
        cb(store.prefs[key]);
      });
    },
    _set: function(key, val) {
      chrome.storage.sync.get(this._defaults, function(store) {
        store.prefs[key] = val;
        chrome.storage.sync.set(store);
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
