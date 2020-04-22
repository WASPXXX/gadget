'use strict';

var s = 'hello';
function greet(name) {
        console.log(s +', ' + name);
}

function hi(name) {
        console.log('hi, '+ name);
}

function byebye(name) {
        console.log('see you soon, ' + name);
}
module.exports = {
        greet: greet,
        hi: hi,
        byebye: byebye
};
console.log('done!');
