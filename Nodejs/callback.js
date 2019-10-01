// function a(){
//     console.log('A');
// }

var a = function() {
    console.log('A');
}

function slow(callback){
    callback();
}

slow(a);