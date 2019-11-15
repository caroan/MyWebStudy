//npm lowdb. 
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');//lowdb에서 파일 싱크 방식을 사용하겠다.
const adapter = new FileSync('db.json'); //db.json에 파일을 저장한다는 뜻.
const db = low(adapter);
db.defaults({users:[], topics:[]}).write();//디폴트 값을 준다.
module.exports = db;