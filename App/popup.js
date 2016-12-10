(function() {
  // Popup Content Script
  var console = chrome.extension.getBackgroundPage().console;
  console.log('Popup loaded');

  // call object from background here
  // var open = replyCheck.OpenReplies;
  var div = document.querySelector('#results');
  var re = /(?:https:\/\/cgcookie.com\/course\/|lesson\/)([a-z\-]*)/i;

  function createQuestionLink(url) {
    var match = re.exec(url);
    var title = match[1];
    var link = document.createElement('div');
    link.className = 'questions';
    var a = document.createElement('a');
    a.className = 'question';
    a.target = '_blank';
    a.href = replyCheck.getNeedReplies().mainUrl + url;
    a.innerHTML = title;
    div.appendChild(a);
    div.appendChild('<br>');
  }

  // calling array from Object and output to console
  function searchList() {
    console.log('search');
    replyCheck.getNeedReplies()._replyList.map((out) => {
      createQuestionLink(out);
    });
    // console.log(replyCheck.getNeedReplies().forEach());
  }

  chrome.runtime.onStartup.addListener((out) => {
    // Listen for Background to update badge
    console.log('Popup Start', out);
  });

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if(req.action == 'done') console.log('received');
    searchList();
  });

  function start() {
    console.log('Starting Popup ' + chrome.app.getDetails().version);
    searchList();
  }
  start();
})();
