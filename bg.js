var createProperties = {
  title: "Send to dogfort",
  contexts: ["image", "video"],
  onclick: sendPost
};

function sendPost(info, tab) {
  var postData = {};

  if (info.mediaType === 'video') {
    if(info.pageUrl.indexOf('youtube.com' > -1)){
      postData.type = "YOUTUBE";
      var idx = info.pageUrl.indexOf('watch?v=') + 8;
      postData.url = info.pageUrl.substr(idx, 11);
    }
  } else {
    postData.type = "IMAGE";
    postData.url = info.srcUrl;
  }

  console.log(postData);

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