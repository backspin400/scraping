var http = require('http');
var url=require('url');
var fs = require('fs');
//var io=require('socket.io')(server);
var port = process.env.PORT || 1337;

var server = http.createServer(function(request, response){ 
    console.log('Connection');
    var path = url.parse(request.url).pathname;
 
    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'}); 
            response.write('hello barry, nice of you to join me');
            break;
        case 'socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            break;
    }
    response.end(); 
}); 
 
server.listen(port); 