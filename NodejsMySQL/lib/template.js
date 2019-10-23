module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <p><a href="/author">author<a></p>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(objectList){
    var list = '<ul>';
    var i = 0;
    while(i < objectList.length){
      list = list + `<li><a href="/?id=${objectList[i].id}">${objectList[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }, authorList:function(resultInAuthor){
    var i = 0;
    var authorList = '';
    while(i<resultInAuthor.length){
      authorList += `<option value=${resultInAuthor[i].id}>${resultInAuthor[i].name}</option>`;
      i++;
    }
    return authorList;
  }, authorListSeleted: function(resultInAuthor, selectedID){
    var i = 0;
    var authorList = '';
    while(i<resultInAuthor.length){
      if(resultInAuthor[i].id === selectedID){
        authorList += `<option selected="selected" value=${resultInAuthor[i].id}>${resultInAuthor[i].name}</option>`
      }else{
        authorList += `<option value=${resultInAuthor[i].id}>${resultInAuthor[i].name}</option>`;
      }
      i++;
    }
    return authorList;
  }, authorTable: function(authorList){
    var i =0;
    var body = '<table>';
    while(i<authorList.length){
      body += `
      <tr>
        <td>${authorList[i].name}</td>
        <td>${authorList[i].profile}</td>
        <td>
          <form action="/updateAuthor" method="post">
            <input type="hidden" name="aid" value=${authorList[i].id}>
            <input type="submit" value="update">
          </form>
        </td>
        <td>
          <form action="/deleteAuthor" method="post">
            <input type="hidden" name="aid" value=${authorList[i].id}>
            <input type="submit" value="delete">
          </form>
        </td>
      </tr>`;
      i++;
    }
    body += `
    </table>
    <style>
      table{
        border-collapse: collapse;
      }
      td{
        border: 1px solid black;
      }
    </style>
    `;
    return body;
  }
}
