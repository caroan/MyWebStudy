const fs = require('fs');
const santizeText = require('sanitize-html');

module.exports = {
    getTempPage: function(){
        fs.readFile(`./data/tempPage.html`, 'utf-8', function(err, desc){
            if(err){
                console.log(err);
            }
            console.log("desc : ");
            console.log(desc);
            var page = desc;
            console.log("page : ");
            console.log(page);
            return page;
        });
    }
}