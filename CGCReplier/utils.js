(function() {
  window.replyCheck = window.replyCheck || {};

  replyCheck.Utils = function() {
    this.replyCheck = '';
  };

  replyCheck.Utils.prototype = {
    callConsole: function(file) {
      console.log('FooFunc prototype loaded from ' + file);
    },
    fetchPageXhr: function(url, cb) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
          console.log(this.responseText);
          cb(this.responseText);
        } else {
          console.log('error with request');
          cb();
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    },
    fetchPage: function(url, cb) {
      fetch(url, {mode: 'cors'})
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        cb(text);
      })
      .catch((err) => {
        console.log(url, err);
      });
    },
    timePoll(pollTime, waitTime, cb) {
      var stopTime = Date.newDate() + pollTime;
      var timeInterval = (resolve, reject) => {
        var res = cb();
        if(res) { resolve(res); }
        else if (Date.newDate() < stopTime) { reject(new Error(cb)); }
        else { reject(new Error('Time over')); }
      };
    }
  };
})();
