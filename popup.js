function saveLogin() {
    localStorage['dogfort_apiToken'] = document.getElementById('apiToken').value;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('apiToken').value = localStorage['dogfort_apiToken'];
    document.querySelector('#save_login_info').addEventListener('click', saveLogin);
});