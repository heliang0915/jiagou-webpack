require('./scss/index.scss');
// require('./aa.css');
import './aa.css';
let str=require("./a.js");


let fn=()=>{
    alert(1);
};
fn();
console.log(str);

class A{
    // a=1
    @log
    aa(str1,msg){

    }
}
function log(target,key,desc) {
    console.log(target,"=="+key,desc);
}

class B {
    
}
function * gen() {
    yield 1;
}

console.log(gen().next());
