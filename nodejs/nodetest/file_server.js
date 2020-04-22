'use strict';
// a simple http server
var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function (request, response) {
    var
        pathname = url.parse(request.url).pathname, // '/static/bootstrap.css'
        filepath = path.join(root, pathname); // '/srv/www/static/bootstrap.css'
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) { //文件
            console.log('200 ' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
 }else if (!err && stats.isDirectory()){ //目录
           console.log(fs.readdir(filepath, 'utf-8', function(err, files) {
          if(err) {
                    console.log(err);
          } else {
                    for(let file of files) {
                              if(file == 'index.html' || file == 'default.html'){
                                        console.log('200' + request.url);
                                        response.writeHead(200);
                                        fs.createReadStream(path.join(filepath, 'index.html')).pipe(response);
                              }
                    }
          }
           }));
 }
 else  {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
