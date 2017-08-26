/*
the require directive helps us load modules. Since "hello world" in node could
literally be just a console.log("Hello world") I opted to do it with a simple web server
*/
http = require('http');


//here we create an http server with the module we loaded above.
http.createServer(function (req, res) {
  /*
  * Now we write our default response:
  * It's going to consist of a head with a status code of 200 - success
  * And the body of the response is going to be "Hellow World"
  * */

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');


  //Then we tell our server which port to listen to - So there's where we'll send our response
}).listen(8080); console.log('Server running on port 8080.');


//now on your console you need to run the following command:  $ node helloWorld.js
//After that just go to your browser ant type :  localhost:8080
//this will trigger our response of "Hello World"
