let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours()+"H: "+date.getMinutes()+"M: "+date.getSeconds()+"S";
}

function makePromisecall(methodType, url, async=true, data=null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(methodType+" state changed called at"+showTime()+". Ready state: "+xhr.readyState+" ,status: "+xhr.status);
            if(xhr.readyState == 4) {
                if(xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }
                else if(xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
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
    });
}
const getUrl = "http://localhost:3000/employees/1";
makePromisecall("GET",getUrl, true)
            .then(responseText => {
                data = JSON.parse(responseText)
                console.log("Get user data at "+showTime()+": ", data)
            })
            .catch(error => {
                console.log("GET ERROR Status: "+JSON.stringify(error));
            })
console.log("MADE AJAX GET CALL TO SERVER AT "+showTime()+"!");

const deleteUrl = "http://localhost:3000/employees/5";
makePromisecall("DELETE",deleteUrl, false)
                .then(responseText => {
                    data = JSON.parse(responseText)
                    console.log("User deleted at "+showTime()+": ", data)
                })
                .catch(error => {
                    console.log("DELETE ERROR Status: "+JSON.stringify(error));
                });
console.log("MADE AJAX DELETE CALL TO SERVER AT "+showTime()+"!");

const postUrl = "http://localhost:3000/employees/";
const empData = {"name":"Jamie","salary":600000};
function userAdded(data) {
    data = JSON.parse(data)
    console.log("User added at "+showTime()+": ", data)
}
makePromisecall("POST",postUrl, true,empData)
                .then(responseText => {
                    data = JSON.parse(responseText)
                    console.log("User added at "+showTime()+": ", data)
                })
                .catch(error => {
                    console.log("DELETE ERROR Status: "+JSON.stringify(error));
                });
console.log("MADE AJAX POST CALL TO SERVER AT "+showTime()+"!");