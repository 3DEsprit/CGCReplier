// background process
// Load DOM Data
(function() {
  console.log('Foo loaded');
  window.replyCheck = window.replyCheck || {};

  replyCheck.SearchUrls = function() {
    this.replyCheck = ''
  };

  replyCheck.SearchUrls.prototype = {
    callConsole: function(file) {
      console.log('FooFunc prototype loaded from ' + file);
    },
    fetchPage: function(url, cb) {
      fetch(url, {mode: 'cors'})
      .then(function(res) {
        console.log(res);
        return res.text();
      })
      .then(function(text) {
        console.log('Req successful');
        cb(text);
      })
      .catch(function(err){
        console.log('Request failed', url, err);
      });
    }
  };
})();
