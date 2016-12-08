(function() {
  // Popup Content Script
  console.log('Popup loaded');

  // call object from background here
  var open = new replyCheck.OpenReplies;
  var div = document.querySelector('#results');

  function createQuestionLink(q) {
    var div = document.createElement('div');
    div.className = 'questions';
    var a = document.createElement('a');
    a.className = 'question';
    a.target = '_blank';
    a.src = q.url;
    div.appendChild(a);

  }

  // calling array from Object and output to console
  function searchList() {
    open._replies.map((out) => {
      console.log(out);
    });
  }

  chrome.runtime.onStartup.addListener(() => {
    // Listen for Background to update badge
    console.log('Popup Start', out);
  });

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log('Popup Receive: ', req, sender, sendResponse);
  });

  chrome.runtime.sendMessage({action: 'run'}, (response) => {
    console.log(response);
  });

  function start() {
    console.log('Starting Popup ' + chrome.app.getDetails().version);
    searchList();
  }

  start();
})();
