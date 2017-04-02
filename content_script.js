var port = chrome.runtime.connect();

var loadTimes = {
  gmailLoadTime : "",
  ciLoadTime : ""
}

var gmailObserver = new WebKitMutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log('Mutation type: ' + mutation.type);
    if ( mutation.type == 'childList' ) {
      if (mutation.addedNodes.length >= 1) {
        if (mutation.addedNodes[0].nodeName != '#text') {
           console.log('Added ' + mutation.addedNodes[0].tagName + ' tag.'
            + "\n" + "Timestamp = " + Date.now());
        }
      }
      else if (mutation.removedNodes.length >= 1) {
        console.log('Removed ' + mutation.removedNodes[0].tagName + ' tag.')
      }
    }
    else if (mutation.type == 'attributes') {
      console.log('Modified ' + mutation.attributeName + ' attribute.' + "\n"
       + "previous attribute name was " + mutation.oldValue +
       "\n" + "Timestamp = " + Date.now());
    }
  });
});

var observerConfig = {
  attributes: true,
  childList: true,
  characterData: true
};


function sendGmailDomMutationInfoIfAvailable() {
  var targetGmailNode = window.document.querySelector(".aeH");
      if(!targetGmailNode) {
        //The node I'm after hasn't yet appeared in the DOM
        //Try in 100ms intervals
        window.setInterval(sendGmailDomMutationInfoIfAvailable,100);
        return;
    }
      gmailObserver.observe(targetGmailNode,observerConfig);
}

function sendCiDomMutationInfoIfAvailable() {
  var targetCiNode = window.document.querySelector("#cirrus-main-tabs");
    if(!targetCiNode) {
        //The node I'm after hasn't yet appeared in the DOM
        //Try in 100ms intervals
        window.setInterval(sendCiDomMutationInfoIfAvailable,100);
        return;
    }

    gmailObserver.observe(targetCiNode,observerConfig);
}

// sendGmailDomMutationInfoIfAvailable();
sendCiDomMutationInfoIfAvailable();
