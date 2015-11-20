var express = require('express');
var http = require('http');
var app = express();
var PORT = 9000;
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('public/index.htm', {root: __dirname });
});

// PROXY to mock api

var request = function(req, res, logName, method) {
    console.log(logName + ' request: ' + req.params.noteId + ': ' + JSON.stringify(req.body));
    var urlParam = req.params.noteId ? '/' + req.params.noteId : '';
    var options = {
        host: 'private-anon-1b1ee710b-note10.apiary-mock.com',
        port: 80,
        path: '/notes' + urlParam,
        method: method
    };

    var httpReq = http.request(options, function(remoteRes) {
        console.log("Got response: " + remoteRes.statusCode+ ":" + remoteRes.statusMessage);
        remoteRes.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            res.send(chunk);
        });
    }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });

    if (req.body) {
        req.write(JSON.stringify(req.body));
    }
    httpReq.end();
};

//get all notes
app.get('/api/notes', function(req, res) {
    request(req, res,'GET_ALL_NOTES','GET');
});

//create a note
app.post('/api/notes', function(req, res) {
    request(req, res,'CREATE_NOTE','POST');
});

//get one note
app.get('/api/notes/:noteId', function(req, res) {
    request(req, res,'GET_NOTE','GET');
});

//update one note
app.put('/api/notes/:noteId', function(req, res) {
    request(req, res,'UPDATE_NOTE','PUT');
});

//delete one note
app.delete('/api/notes/:noteId', function(req, res) {
    request(req, res,'DELETE_NOTE','DELETE');
});

app.listen(PORT);
console.log("Listening on port " + PORT);
