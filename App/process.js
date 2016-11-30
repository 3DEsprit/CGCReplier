// Stuff
var status;

// Send Results to Pop Up
function render(status) {
  document.getElementById('status').textContent = status;
}

// Find Questions without Replies
function getReplyCount(course, callback, errorCallback) {
  var mainUrl = 'https://cgcookie.com/';
  var link = new XMLHttpRequest();
  link.open('GET', mainUrl + course);
  link.responseType = 'json';
  link.onload = function() {
    var res = link.response;
    if(!res || !res.responseData) {
      errorCallback('No response back! No bueno!');
      return;
    }
    var result = res;
    render(result);
    callback();
  };
  link.onerror = function() {
    errorCallback('Network error.');
  };
  link.send();
}

chrome.runtime.onMessage.addListener((data) => {
  return data;  
});
