(function() {
  // Popup Content Script
  var console = chrome.extension.getBackgroundPage().console;

  console.log('Popup loaded');
  // call object from background here
  var needFirst = replyCheck.getNeedReplies();
  var re = /(?:https:\/\/cgcookie.com\/course\/|lesson\/)([a-z\-]*)/i;
  var questions = 0;

  function createQuestionLink(url, flow) {
    var div = document.querySelector('.' + flow);
    if(div.style.display == '') div.style.display = 'block';
    var match = re.exec(url);
    var title = match[1].toUpperCase().replace(/\-/gi, ' ');
    var link = document.createElement('div');
    link.className = 'questions';
    var a = document.createElement('a');
    a.className = 'question';
    a.target = '_blank';
    a.href = replyCheck.getNeedReplies().mainUrl + url;
    a.innerHTML = title;
    div.appendChild(a);
    needFirst._total += 1;
  }

  // calling array from Object and output to console
  function searchList(flow, cb) {
    for(let n of needFirst._questionList[flow]) {
      createQuestionLink(n, flow);
      questions++;
      if(questions == needFirst._questionList[flow].length) cb('done');
    }
    // needFirst._questionList = [];
  }

  chrome.runtime.onStartup.addListener((out) => {
    // Grab NeedReplies _total and update badge
    console.log('Popup Start', out);
  });

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if(req.action == 'done') console.log('received');
    searchList('Blender', (out) => {
      console.log(out);
    });
  });

  function start() {
    console.log('Starting Popup ' + chrome.app.getDetails().version);
    searchList('Blender', (out) => {
      console.log(out);
    });
  }
  start();
})();
