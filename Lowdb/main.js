const myLow = require('lowdb'); //로우 디비 모듈을 설치
const myFileSync = require('lowdb/adapters/FileSync'); //데이터 저장 시 파일/메모리/로컬스토리지 중 어떤 것을 가져와야 하는가를 정해야 하는 도중 파일 싱크 방식으로 가져온다는 말임
const myAdapter = new myFileSync('db.json'); //우리는 db.json 방식으로 저장하겠다는 뜻
const myDB = myLow(myAdapter); // 우리는 파일 동기 방식이자 db.json방식으로 저장하겠다는 뜻

//디폴트
myDB.defaults({ topic: [], author: [] }).write() //저장할 정보가 없으면 자동으로 만들어주는 디폴트 정보

//데이터 INSERT & CREATE
// myDB.get('author').push({id:1, name:'an', profile:'developer'}).write();
// myDB.get('author').push({id:2, name:'myung', profile:'Artist'}).write();
// myDB.get('topic').push({id:1, title:'lowdb', description:'LowDB is ...', author:'1'}).write();
// myDB.get('topic').push({id:2, title:'mysql', description:'mysql is ...', author:'1'}).write();
// myDB.get('topic').push({id:3, title:'Oracle', description:'Oracle is ...', author:'2'}).write();

//SELECT
// console.log(myDB.get('topic').find({id:1}).value());
// //sortBy 정렬, take Limit, map 일부 컬럼만 가져옴
// console.log(myDB.get('topic').find({title:'lowdb', author:'1'}).value());
// console.log(myDB.get('topic').map('title').value()); //일부 컬럼만 가져오는데 find를 쓰는 것은 안되는 것 같다.

//UPDATE
// myDB.get('topic').find({title: 'Oracle'}).assign({id: 2}).write();
// myDB.get('topic').find({title: 'mysql'}).assign({id: 3}).write();

//DELETE
//myDB.get('author').remove({id:1}).write();

//lowdb는 기능이 거의 없기 때문에 auto_increment를 사용할 수 없다.
//그러나 아래와 같이 사용하면 거의 비슷하게 사용할 수 있다.

const shortid = require('shortid'); // shortid 는 랜덤한 값을 만들어주고 그 랜덤 값은 왠만해서는 중복된 값을 만들어주지 않는다.
const postID = myDB.get('author').push({id: shortid.generate(), name:'sun', profile: 'Designer'}).write().id;
const post = myDB.get('author').find({id: postID}).value();

