var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var myMysql = require('mysql');
var myConn = myMysql.createConnection({
  host: 'localhost',
  user : 'caro',
  password : 'dksd1702',
  database : 'nodejsdb'
});

myConn.connect();

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          myConn.query(`SELECT * FROM TOPIC`, function(error, results, fields){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(results);
            var html = template.HTML(title, list,
                `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
                );
            response.writeHead(200);
            response.end(html);
          });
        });
      } else {
        myConn.query(`SELECT * FROM TOPIC`, function(err, results, field){
          if(err){
            throw err;
          }
          myConn.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?`,[queryData.id], function(error, result, fields){ //?에 두번째 값이 들어가는데 공격의 가능성이 있는 것들은 세탁까지 해준다.
            if(error){
              throw error;
            }
            var title = result[0].title;
            var desc = result[0].description;
            var list = template.list(results);
            var html = template.HTML(title, list, `<h2>${title}</h2>${desc} <p>by ${result[0].name}</p>`,
            ` <a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <input type="submit" value="delete">
                </form>`);
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){
      myConn.query(`SELECT * FROM TOPIC`, function(error, results, fields){
        myConn.query(`SELECT * FROM author`, function(errInAuthor, resultInAuthor){
          if(errInAuthor){
            throw errInAuthor;
          }
          var title = 'Create';
          var i=0;
          var authorList ='';
          while(i<resultInAuthor.length){
            authorList += `<option value=${resultInAuthor[i].id}>${resultInAuthor[i].name}</option>`;
            i++;
          }
          var list = template.list(results);
          var html = template.HTML(title, list,
              `<form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p><textarea name="description" placeholder="description"></textarea></p>
              <p>
                <select name="author">
                  ${authorList}
                </select>
              </p>
              <p><input type="submit" value="submit"></p>
            </form>`,
              `<a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>`
              );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          myConn.query(`INSERT INTO topic (title, description, created, author_id)
                        VALUES(?, ?, NOW(), ?)`,
                        [post.title, post.description, 1],
                        function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          });
      });
    } else if(pathname === '/update'){
      myConn.query(`SELECT * FROM topic`, function(err, results){
        if(err){
          throw err;
        }
        myConn.query(`SELECT * FROM topic WHERE id = ?`, [queryData.id], function(error, result){
          if(error){
            throw error;
          }
          var id = result[0].id;
          var title = result[0].title;
          var description = result[0].description;
          var list = template.list(results);
          var html = template.HTML(title, list, 
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${id}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${id}">update</a>`);

            response.writeHead(200);
            response.end(html);
        });
      });

    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          myConn.query(`UPDATE topic SET title=?, description=? WHERE id = ?`, [post.title, post.description, post.id], function(err, result){
            response.writeHead(302, {Location:`/?id=${post.id}`});
            response.end();
          });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          myConn.query(`DELETE FROM topic WHERE id = ?`, [post.id], function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: '/'});
            response.end();
          });
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
