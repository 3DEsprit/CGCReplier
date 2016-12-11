// deal with options
(function() {
  window.replyCheck = window.replyCheck || {};

  replyCheck.Prefs = function() {
    this._settings = {
      options: {
        pollTime: 15000,
        waitTime: 15,
        blender: true,
        concept: true,
        sculpt: true,
        unity: true
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
      });
    },
    getFlow: function(flowName, callback) {
      this.get_(flowName, callback);
    },
    setFlow: function(flowName, flow) {
      this.set_(flowName, flow);
    },
  };

})();
