var PARSE_APP_ID = "jbf4C6H4MQ1ByQ8gs80tSXyJRn92rj0E5GWen8hM";
var PARSE_JS_KEY = "1wJuncE5jc4P8cH7nfkBMBMHjrfN9a0Z3MhiQI56";
var PARSE_URL = "https://parseapi.back4app.com/";

// Parse Initialize
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/'

function createUserPw() {

    $.ajax({
    url: "https://parseapi.back4app.com/users",
    dataType: "json",
    type: "post",
    headers: {
        "X-Parse-Application-Id":"jbf4C6H4MQ1ByQ8gs80tSXyJRn92rj0E5GWen8hM",
        "X-Parse-REST-API-Key":"aHVYFKjVCWCgAekxHe41oR4nbciHnMldVwujg90F",
        "X-Parse-Revocable-Session":"1"
    },
    data: {
        "password": localStorage.getItem('password'),
        "username": localStorage.getItem('email'),
        "email": localStorage.getItem('email')
        }
    });
}