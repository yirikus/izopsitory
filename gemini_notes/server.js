var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var config = require('config.json')('./dev_config.json');
app.use(express.static(__dirname + config.staticFolder));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(multipart());

app.get('/', function(req, res) {
    res.sendFile(config.indexPath, {root: __dirname });
});

// PROXY to mock api
var request = function(req, res, logName, method) {
    console.log(logName + ' request: ' + req.params.noteId + ': ' + JSON.stringify(req.body));
    var urlParam = req.params.noteId ? '/' + req.params.noteId : '';
    var options = {
        host: config.ws.notes.host,
        port: config.ws.notes.port,
        path: config.ws.notes.path + urlParam,
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
        httpReq.write(JSON.stringify(req.body));
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

app.listen(config.port);
console.log("Listening on port " + config.port + " using '" + config.configName + "' configuration");
