var dogfortMainMenu = {
  title: "send to dogfort channel",
  contexts: ["image"],
  id: "dogfort"
}

function refreshChannels() {
  $.ajax({
    url:'http://dogfort.io/api/v1/channels/user/' + localStorage['dogfort_userid'],
    headers: {
      'Authorization': localStorage['dogfort_token']
    }
  }).success(function(data){
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create(dogfortMainMenu);

    for(var n in data.channels) {
      var subMenu = {
        title: data.channels[n].name,
        contexts: ["image"],
        parentId: 'dogfort',
        id: data.channels[n].uid,
        onclick: sendPost
      }

      chrome.contextMenus.create(subMenu);
    }
  });
}

var dogfortSep = {
  contexts: ["image"],
  type: "separator",
  parentId: "dogfort"
}

function sendPost(info, tab) {
  message = JSON.stringify({
    channelId: info.menuItemId,
    userId: localStorage['dogfort_userid'],
    text: info.srcUrl
  });

  $.ajax({
    url:'http://dogfort.io/api/v1/messages',
    type: 'POST',
    headers: {
      'Authorization': localStorage['dogfort_token']
    },
    data: message
  });
}

refreshChannels();
