var createProperties = {
  title: "Send to dogfort",
  contexts: ["image", "video"],
  onclick: sendPost
};

function sendPost(info, tab) {
  var postData = {};

  if (info.mediaType === 'video') {
    postData.type = "VIDEO";
  } else {
    postData.type = "IMAGE";
  }

  postData.url = info.srcUrl;

  var post = $.post('http://api.dogfort.io/posting/?api_key=' + localStorage['dogfort_apiToken'], postData)
    .fail(function(data) {
    if (data.status === 400) {
      alert(data.responseText);
    }

    if (data.status === 401) {
      alert(data.responseText);
    }
  });
}

chrome.contextMenus.create(createProperties);