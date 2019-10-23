var myConn = require('./db');
var template = require('./template.js');
exports.home = function(request, response){
    myConn.query(`SELECT * FROM TOPIC`, function(error, results, fields){
        if(error){
          throw error;
        }
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
}

exports.page = function(request, response, queryData){
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

exports.create = function(request, response, queryData){
    myConn.query(`SELECT * FROM TOPIC`, function(error, results, fields){
        myConn.query(`SELECT * FROM author`, function(errInAuthor, resultInAuthor){
          if(errInAuthor){
            throw errInAuthor;
          }
          var title = 'Create';
          
          var list = template.list(results);
          var html = template.HTML(title, list,
              `<form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p><textarea name="description" placeholder="description"></textarea></p>
              <p>
                <select name="author">
                  ${template.authorList(resultInAuthor)}
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
}

exports.create_process = function(request, response, qs){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          myConn.query(`INSERT INTO topic (title, description, created, author_id)
                        VALUES(?, ?, NOW(), ?)`,
                        [post.title, post.description, post.author],
                        function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          });
      });
}

exports.update = function(request, response, queryData){
    myConn.query(`SELECT * FROM topic`, function(err, results){
        if(err){
          throw err;
        }
        myConn.query(`SELECT * FROM author`, function(errInAuthor, resultInAuthor){
          if(errInAuthor){
            throw errInAuthor;
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
                  <select name="author">
                    ${template.authorListSeleted(resultInAuthor, result[0].author_id)}
                  </select>
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
        
      });
}

exports.update_process = function(request, response, qs){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        myConn.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id = ?`, [post.title, post.description, post.author, post.id], function(err, result){
          response.writeHead(302, {Location:`/?id=${post.id}`});
          response.end();
        });
    });
}

exports.delete_process = function(request, response, qs){
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
}