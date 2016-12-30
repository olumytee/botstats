var request = require('request');

// production
var url = 'https://api.botstats.co/api/bot/post';



function OK ( token ) {
    return { 
    receive: function (event, next) {    
        var sendData = {
            source: event.source,
            type: "incoming",
            profile: event.user,
            conversation: event.address.conversation,
            message: event.text,
        }

        var options = {
            method: 'post',
            body: sendData,
            json: true,
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        request(options, function(error, result){
            if (error){
                console.log("error", error)
            }
        })
        next();
    }, 
    send: function (event, next) {

        var sendData = {
            source: event.source,
            type: "outgoing",
            profile: event.address.user,
            conversation: event.address.conversation,
            message: messageType(),
        }

        function messageType() {
            if (event.text) {
                return event.text
            } else if ( event.attachments) {
                return "Sent Attachments"
            } else {
                return "Unknown message type"
            }
        }
        var options = {
            method: 'post',
            body: sendData,
            json: true,
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        request(options, function(error, result){
            if (error){
                console.log("error", error)
            }
        })
        next();
    }

    }
}




