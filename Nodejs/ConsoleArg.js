var args = process.argv;

console.log(args);

if(args[2] === 1){
    console.log(1);
}else if(args[2] === '1'){
    console.log("Literal 1");
}
else{
    console.log("not 1");
}