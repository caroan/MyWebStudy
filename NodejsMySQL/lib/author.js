var myConn = require(`./db.js`);
var template = require(`./template.js`);
exports.home = function(request, response){
    myConn.query(`SELECT * FROM topic`,function(errInTopic, resultInTopic, field){
        if(errInTopic){
            throw errInTopic;
        }
        myConn.query(`SELECT * FROM author`, function(errInAuthor, resultInAuthor){
            if(errInAuthor){
                throw errInAuthor;
            }
            var title = 'author';
            var list = template.list(resultInTopic);
            var html = template.HTML(title, list,
                `${template.authorTable(resultInAuthor)}`,
                `<a href="/createAuthor">create</a>`);
            response.writeHead(200);
            response.end(html);
        });
    });
}

exports.create = function(request, response){
    myConn.query(`SELECT * FROM topic`, function(errInTopic, resultInTopic, field){
        if(errInTopic){
            throw errInTopic;
        }
        var list = template.list(resultInTopic);
        var html = template.HTML('Create Author', list,
            `<form action="createAuthor_process" method="post">
                <p><input type="text" name="authorName" placeholder="저자이름"></input></p>
                <p><textarea name="authorProfile" placeholder="역활"></textarea></p>
                <p><input type="submit" value="submit"></p>
            </form>`,
            ``);
        response.writeHead(200);
        response.end(html);
    });
}

exports.create_process = function(request, response, qs){
    var body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        myConn.query(`INSERT INTO author(name, profile) VALUES(?,?)`,[post.authorName, post.authorProfile], function(errInAuthor, resultInAuthor){
            if(errInAuthor){
                throw errInAuthor;
            }
            response.writeHead(302, {Location: `/author`});
            response.end();
        });
    });
}

exports.update = function(request, response, qs){
    myConn.query(`SELECT * FROM topic`, function(errInTopic, resultInTopic){
        if(errInTopic){
            throw errInTopic;
        }
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            myConn.query(`SELECT * FROM author WHERE id=?`, [post.aid],function(errInAuthor, resultInAuthor){
                if(errInAuthor){
                    throw errInAuthor;
                }
                var list = template.list(resultInTopic);
                var html = template.HTML('UPDATE AUTHOR', list,
                    `<form action="/updateAuthor_process" method="post">
                        <input type="hidden" name="aid" value=${post.aid}></input>
                        <p><input type="text" name="authorName" placeholder="${resultInAuthor[0].name}"></input></p>
                        <p><textarea name="authorProfile" placeholder="${resultInAuthor[0].profile}"></textarea></p>
                        <p><input type="submit" value="submit"></p>
                    </form>`,
                    ``);
                response.writeHead(200);
                response.end(html);
            });
        });
    });
}

exports.update_process = function(request, response, qs){
    var body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        myConn.query(`UPDATE author SET name = ?, profile = ? WHERE id = ?`, [post.authorName, post.authorProfile, post.aid], function(errInAuthor, resultInAuthor){
            if(errInAuthor){
                throw errInAuthor;
            }
            response.writeHead(302, {Location:"/author"});
            response.end();
        });
    });
}

exports.delete_process = function(request, response, qs){
    var body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        //저자를 지울때 토픽에서 해당 저자의 글을 먼저 지우고 해당 저자를 지우도록 한다.
        myConn.query(`DELETE FROM topic WHERE author_id=?`,[post.aid], function(errInTopic, resultInTopic){
            //위처럼 입력값을 ?로 대체하고 주면 인젝션 해킹을 막을 수 있다.
            //query 함수는 기본적으로 하나의 쿼리만 담을 수 있다. 이것을 여럿 담고 싶다면 myConn 선언에서 multipleStatements: true로 수정하면 된다. <- 안쓰는 것이 좋다.
            if(errInTopic){
                throw errInTopic;
            }
            myConn.query(`DELETE FROM author WHERE id=?`,[post.aid], function(errInAuthor, resultInAuthor){
                if(errInAuthor){
                    throw errInAuthor;
                }
                response.writeHead(302, {Location:"/author"});
                response.end();
            });
        });
    });
}