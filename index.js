var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var handlebars = require('handlebars');

//Using express to serve static files
var app = express();
app.use(express.static(__dirname + '/public'));

// var filepath = path.join(__dirname, 'beat.wav');

//The response type needs to be set to audio/mpeg.
//This filetype will be appropriate for most music files including .wav, .mp3, .mpeg, etc
app.get('/music', function(req, res){
    res.set({'Content-Type': 'audio/mpeg'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
});

app.listen(8000);
console.log("playing the smooth sound on server 8000")
