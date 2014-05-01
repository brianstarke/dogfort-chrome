function login() {
  authRequest = JSON.stringify({
    username: $('#username').val(),
    password: $('#password').val()
  });

  $.post('http://dogfort.io/api/v1/auth', authRequest).success(function(data) {
    localStorage['dogfort_token'] = data.token
    $('#logged_in').show();
    $('#login_form').hide();
    getCurrentUser();
  }).fail(function(data) {
    chrome.extension.getBackgroundPage().console.log("FAIL");
    chrome.extension.getBackgroundPage().console.log(data);
  });
}

function logout() {
  delete localStorage['dogfort_token']
  $('#logged_in').hide();
  $('#login_form').show();
}

function getCurrentUser() {
  $.ajax({
    url:'http://dogfort.io/api/v1/auth',
    headers: {
      'Authorization': localStorage['dogfort_token']
    }
  }).success(function(data){
    localStorage['dogfort_username'] = data.user.username;
    localStorage['dogfort_userid'] = data.user.uid;
    $('#logged_in_msg').html("logged in as " + data.user.username);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  if(localStorage['dogfort_token'] && localStorage['dogfort_username'] && localStorage['dogfort_userid']) {
    $('#logged_in').show();
    $('#login_form').hide();
    $('#logged_in_msg').html("logged in as " + localStorage['dogfort_username']);
  }

  $('#login').click(login)
  $('#logout').click(logout)
});


