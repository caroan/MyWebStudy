const express = require('express');
var router = express.Router();
var fs = require('fs');
var template = require('../lib/template.js');
var path = require('path');
var qs = require('querystring');
var auth =require('../lib/auth');
  
  router.get('/create', function(request, response){
    if(!auth.isOwner(request, response)){
      response.redirect('/');
      return false;
    }
    fs.readdir('./data', function(error, filelist){
      var title = 'WEB - create';
      var list = template.list(filelist);
      var html = template.HTML(title, list, `
        <form action="/topic/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `, '', auth.getStatusUI(request, response));
      response.send(html);
    });
  });
  
  //포스트 방식으로 받으면 아래와 같이 받아야 한다.(이름이 같으면 겟인지 포스트 방식인지 확인을 한다.)
  router.post('/create_process', function(request, response){
    if(!auth.isOwner(request, response)){
      response.redirect('/');
      return false;
    }
  //위와 아래 코드는 동일한 코드이다.  
    var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              response.redirect(`/topic/${title}`);
            })
        });
  });
  
  router.get('/update/:pageID', function(request, response){
    if(!auth.isOwner(request, response)){
      response.redirect('/');
      return false;
    }
    fs.readdir('./data', function(error, filelist){
      if(error){
        next(error);
        return;
      }
      var filteredId = path.parse(request.params.pageID).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = request.params.pageID;
        var list = template.list(filelist);
        var html = template.HTML(title, list,
          `
          <form action="/topic/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`,
          auth.getStatusUI(request, response)
        );
        response.send(html);
      });
    });
  });
  
  router.post('/update_process', function(request, response){
    if(!auth.isOwner(request, response)){
      response.redirect('/');
      return false;
    }
    var body = '';
        request.on('data', function(data){
          console.log('I am In');
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(error){
              fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.redirect(`/page/${title}`);
              })
            });
        });
  });
  //app.get('/page', (req, res) => res.send('page page'));
  
  router.post('/delete_process', function(request, response){
    if(!auth.isOwner(request, response)){
      response.redirect('/');
      return false;
    }
    var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function(error){
              response.redirect(`/`);
            })
        });
  });

  module.exports = router;