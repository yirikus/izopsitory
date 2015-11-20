var express = require('express');
var app = express();
var PORT = 9000;
//var ROOT = 'public';
app.use(express.static(__dirname + '/public'));

//FIXME add routes

app.get('/', function(req, res) {
   res.sendFile('public/index.htm', {root: __dirname });
});


app.listen(PORT);
console.log("App listening on port " + PORT);
