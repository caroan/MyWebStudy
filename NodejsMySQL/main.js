var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var myConn = require('./lib/db');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        topic.home(request, response);
      } else {
        topic.page(request, response, queryData);
      }
    }
    else if(pathname === '/create'){
      topic.create(request, response, queryData);
    }
    else if(pathname === '/create_process'){
      topic.create_process(request, response, qs);
    }
    else if(pathname === '/update'){
      topic.update(request, response, queryData);
    }
    else if(pathname === '/update_process'){
      topic.update_process(request, response, qs);
    }
    else if(pathname === '/delete_process'){
      topic.delete_process(request, response, qs);
    }
    else if(pathname === '/author'){
      author.home(request, response);
    }
    else if(pathname === '/createAuthor'){
      author.create(request, response, queryData);
    }
    else if(pathname === '/createAuthor_process'){
      author.create_process(request, response, qs);
    }
    else if(pathname === '/updateAuthor'){
      author.update(request, response, qs);
    }
    else if(pathname === '/updateAuthor_process'){
      author.update_process(request, response, qs);
    }
    else if(pathname === '/deleteAuthor'){
      author.delete_process(request, response, qs);
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
