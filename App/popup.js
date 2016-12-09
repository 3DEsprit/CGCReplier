(function() {
  // Popup Content Script
  var console = chrome.extension.getBackgroundPage().console;
  console.log('Popup loaded');

  // call object from background here
  var open = new replyCheck.OpenReplies;
  var need = new replyCheck.NeedReplies;
  var div = document.querySelector('#results');

  function createQuestionLink(url) {
    var link = document.createElement('div');
    link.className = 'questions';
    var a = document.createElement('a');
    a.className = 'question';
    a.target = '_blank';
    a.src = need.mainUrl + url + '#discussion';
    a.innerHTML = url;
    div.appendChild(a);
  }

  // calling array from Object and output to console
  function searchList() {
    open._replies.map((out) => {
      console.log('Reply: ' + out);
      createQuestionLink(out);
    });
  }

  chrome.runtime.onStartup.addListener(() => {
    // Listen for Background to update badge
    console.log('Popup Start', out);
  });

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if(req.action === 'done') console.log('received');
    searchList();
  });

  // chrome.runtime.sendMessage({action: 'run'});

  function start() {
    console.log('Starting Popup ' + chrome.app.getDetails().version);
    searchList();
  }
  start();
})();
