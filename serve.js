// JavaScript source code
var http = require('http');
var fs = require("fs");

function sendFileContent(response, fileName, contentType) {
    fs.readFile(fileName.replace(/[/]/gi,'\\'), function (err, data) {
        if (err) {
            response.writeHead(404);
            response.write("Not found!");
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.write(data);
        }
        response.end();
    });
}

http.createServer(function (request, response) {
    //if (/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
    if (request.url.toString().endsWith('.css')) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    }
    else if (request.url.toString().endsWith('.html')) {//if (/^\/[a-zA-Z0-9\/]*.html$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/html");
    }
    else if (request.url.toString().endsWith('.htm')) {//if (/^\/[a-zA-Z0-9\/]*.htm$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/html");
    }
    else if (request.url.toString().endsWith('.js')) {//if (/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
        response.end();
    }
    
}).listen(3000);
