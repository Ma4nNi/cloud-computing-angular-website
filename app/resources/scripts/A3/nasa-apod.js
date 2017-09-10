


var request = require('request');
var fs = require('fs');
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

request('https://api.nasa.gov/planetary/apod?api_key=PRRmaPfUtlphJWO8Ds2l5GvYkb2pc0KEOIw8nE08', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    body = JSON.parse(body);
    console.log(body['title']) // Print the google web page.
    download(body.url, body.title+".jpg", function(){

    });

  }




})
