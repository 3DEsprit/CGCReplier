// background process
// Load DOM Data
(function() {
window.replyCheck = window.replyCheck || {};

replyCheck.fetchPage = function(url, resType, cb) {
  var xhr = new XMLHttpRequest();
  if (resType == 'json') xhr.resType = 'text';
  else xhr.resType = resType;

  xhr.onreadystatechange = function(state) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var res = (resType == 'json' ? JSON.parse(xhr.res) : xhr.res);
        console.log(res);
        cb(res);
      }
    }
  };
  xhr.onerror = function(err) { console.log('xhr error:', err); };
  xhr.open('GET', url, true);
  xhr.send();
};
})();
