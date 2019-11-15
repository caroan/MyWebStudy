const express = require('express');
const router = express.Router();
const fs = require('fs');
const template = require('../lib/template');
const path = require('path');
const qs = require('querystring');
const auth = require('../lib/auth');
const db = require('../lib/db');
const shortID = require('shortid');

router.get('/create', function(req, res){
    var aa = "GUAHK6RX";
    console.log(db.get('users').find({id:"x9Uhrupq"}).value());
    if(!auth.isOwner(req, res)){
        res.redirect('/');
        return false;
    }
    var title = 'WEB-create';
    var list = template.LIST(req.list);
    var html = template.HTML(title, list,
        `<form action="/topic/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="desc" placeholder="desc"></textarea></p>
            <p><input type="submit" value="create"></p>
        </form>`,
        '',auth.getStatusUI(req, res));
    res.send(html);

    // fs.readdir('./data', function(error, filelist){
    //     var title = 'WEB-create';
    //     var list = template.LIST(filelist);
    //     var html = template.HTML(title, list,
    //         `<form action="/topic/create_process" method="post">
    //             <p><input type="text" name="title" placeholder="title"></p>
    //             <p><textarea name="desc" placeholder="desc"></textarea></p>
    //             <p><input type="submit" value="create"></p>
    //         </form>`,
    //         '',auth.getStatusUI(req, res));
    //     res.send(html);
    // });
});

router.post('/create_process', function(req, res){
    if(!auth.isOwner(req, res)){
        res.redirect('/');
        return false;
    }
    var post = req.body;
    var title = post.title;
    var desc = post.desc;
    // fs.writeFile(`data/${title}`,desc, 'utf8', function(error){
    //     res.redirect(`/page/${title}`);
    // });
    var id = shortID.generate(); 
    db.get('topics').push({
        id: id,
        title: title,
        desc: desc,
        user_id: req.user.id
    }).write();
    res.redirect(`/page/${id}`);
});

router.get('/update/:updateID', function(req, res){
    if(!auth.isOwner(req, res)){
        res.redirect('/');
        return false;
    }

    fs.readdir(`./data`, function(error, filelist){
        if(error){
            next(error);
            return;
        }
        var filteredTitle = path.parse(req.params.updateID).base;

        fs.readFile(`data/${filteredTitle}`, 'utf8', function(err, desc){
            var list = template.LIST(filelist);
            var html = template.HTML(filteredTitle, list,
                `<form action="/topic/update_process" method="post">
                    <p><input type="hidden" name="prevTitle" value="${filteredTitle}"></p>
                    <p><input type="text" name="title" placeholder="${filteredTitle}"></p>
                    <p><textarea name="desc" placeholder="${desc}"></textarea></p>
                    <p><input type="submit" value="update"></p>
                </form>`,
                `<a href="/topic/create">create</a> <a href="/topic/update/${filteredTitle}">update</a>`,
                auth.getStatusUI(req, res));
            res.send(html);
        });
    });
});

router.post('/update_process', function(req, res){
    if(!auth.isOwner(req, res)){
        res.redirect('/');
        return false;
    }

    //main.js 에서 app.use(bodyParser.urlencoded({extended: false}));를 했을 때 request에 body가 생겼다.
    var post = req.body;
    var prevTitle = post.prevTitle;
    var title = post.title;
    var desc = post.desc;

    fs.rename(`data/${prevTitle}`, `data/${title}`, function(error){
        if(error){
            console.log(error);
            return;
        }
        fs.writeFile(`data/${title}`, desc, 'utf8', function(err){
            if(err){
                console.log(err);
                return;
            }
            res.redirect(`/page/${title}`);
        });
    });
});

router.post('/delete_process', function(req, res){
    if(!auth.isOwner(req, res)){
        res.redirect('/');
        return false;
    }
    var post = qs.parse(body);
    var id = post.id;
    var filteredID = path.parse(id).base;

    fs.unlink(`data/${filteredID}`, function(error){
        res.redirect(`/`);
    });
});

module.exports = router;