var express = require('express');
var router = express.Router();
const template = require('../lib/template');
const auth = require('../lib/auth');

router.get('/', function(request, response){
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.success){
        feedback = fmsg.success[0];
    }

    var title = 'Welcome';
    var description = 'Hello Node js';
    var list = template.LIST(request.list);
    var html = template.HTML(title, list, 
        `<div>${feedback}</div>
        <h2>${title}</h2>${description}
        <img src="/images/example.jpg" style="width:100px; display:block; margin-top:10px">`,
        `<a href="/topic/create">create</a>`,
        auth.getStatusUI(request, response));
    response.send(html);
});

module.exports = router;