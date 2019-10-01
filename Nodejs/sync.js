var fs = require('fs');

//ReadFileSync

// console.log('A');
// var result = fs.readFileSync('syncasyncSample', 'utf8');
// console.log(result);
// console.log('C');

//순서대로 A >> B >> C 순으로 출력된다.

console.log('A');
fs.readFile('syncasyncSample', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');

// A >> C >> B 순으로 출력된다. 비동기 적인 방식은 성능이 좋다.