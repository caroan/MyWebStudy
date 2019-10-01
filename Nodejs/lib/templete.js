var sani = require('sanitize-html');

module.exports = {
    html: function(title, list, description, control){
  
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB2 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB2</a></h1>
        ${list}
        ${control}
        <h2>${title}</h2>
        <p>${description}
        </p>
      </body>
      </html>
      `;
    },
  
    list:function(filelist){
      var list = '<ul>';
      var i = 0;
      while(i<filelist.length){
          fileName = sani(filelist[i]);
        list = list + `<li><a href="/?id=${fileName}">${fileName}</a></li>`;
        i++;
      }
      list = list + '</ul>';
    
      return list;
    }
  }

//  module.exports = templeteObject;