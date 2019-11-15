module.exports = {
    HTML:function(title, list, body, control, authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">register</a>'){
        return `
        <!doctype html>
        <html>
        <head>
            <title>Web1 - ${title}</title>
            <meta charset = "utf-8">
        </head>
        <body>
            ${authStatusUI}
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
    },
    LIST:function(fileList){
        var list = '<ul>';
        var i = 0;
        while(i< fileList.length){
            list += `<li><a href="/page/${fileList[i].id}">${fileList[i].title}</a></li>`;
            i ++;
        }

        list += '</ul>';
        return list;
    }
}