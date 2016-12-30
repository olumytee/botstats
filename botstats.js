var querystring = require('querystring');
var http = require('https');


module.exports = function( token ) {
    return { 
    receive: function (event, next) {    
        var data = querystring.stringify({
            source: event.source,
            type: "incoming",
            profile: event.user,
            conversation: event.address.conversation,
            message: event.text,
        })

        var options = {
            host: 'api.botstats.co/api/bot',
            port: null,
            path: '/post',
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log("body: " + chunk);
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        req.write(data);
        req.end();
        next();
    }, 
    send: function (event, next) {

        var data = querystring.stringify({
                        source: event.source,
                        type: "outgoing",
                        profile: event.address.user,
                        conversation: event.address.conversation,
                        message: messageType()
            });

        var options = {
            host: 'api.botstats.co/api/bot',
            port: null,
            path: '/post',
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log("body: " + chunk);
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        req.write(data);
        req.end();
        next();
    }

    }
}