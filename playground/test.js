var a = 100;

function foo() {
        a = 400;
        (function() {
                a = 500;
        })();
}

foo();

console.log(a);
console.log('dkj\ndkjj');
console.log('jj');
//nah
//nah