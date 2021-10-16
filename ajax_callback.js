let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours()+"H: "+date.getMinutes()+"M: "+date.getSeconds()+"S";
}

function makeAJAXcall(methodType, url, callback, async=true, data=null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(methodType+" state changed called at"+showTime()+". Ready state: "+xhr.readyState+" ,status: "+xhr.status);
        if(xhr.readyState == 4) {
            if(xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            }
            else if(xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server error!");
            }
        }
    }
    xhr.open(methodType, url, async);
    if(data) {
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
    console.log(methodType+" request sent to server at "+showTime()+"!");
}
const getUrl = "http://localhost:3000/employees/1";
function getUserDetails(data) {
    data = JSON.parse(data)
    console.log("Get user data at "+showTime()+": ", data)
}
makeAJAXcall("GET",getUrl, getUserDetails, true);
console.log("MADE AJAX GET CALL TO SERVER AT "+showTime()+"!");

const deleteUrl = "http://localhost:3000/employees/5";
function UserDeleted(data) {
    data = JSON.parse(data)
    console.log("User deleted at "+showTime()+": ", data)
}
makeAJAXcall("DELETE",deleteUrl, UserDeleted, true);
console.log("MADE AJAX DELETE CALL TO SERVER AT "+showTime()+"!");

const postUrl = "http://localhost:3000/employees/";
const empData = {"name":"Jame","salary":600000};
function userAdded(data) {
    data = JSON.parse(data)
    console.log("User added at "+showTime()+": ", data)
}
makeAJAXcall("POST",postUrl, userAdded, true,empData);
console.log("MADE AJAX POST CALL TO SERVER AT "+showTime()+"!");