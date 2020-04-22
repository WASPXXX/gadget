// 闭包
/* 
函数与声明该函数的词法环境的组合 
这个环境包含了这个闭包创建时所能访问的所有局部变量
*/

//intro
function simpleAdder(x) {
        return (y) => x+y;
}
var add100 = simpleAdder(100);    
var add1000 = simpleAdder(1000);  //相同定义，不同词法环境的两个闭包
add100(24); // 124
add1000(8); //1008

//简单计数器
function init_counter(init) {
        var n = init || 0;
        return {
                inc: () =>  {n += 1; return n; },
                dec:() => { n -= 1; return n; }
        }
}
var counter1 = init_counter();
counter1.inc(); // 1
counter1.inc(); // 2
counter1.inc(); // 3
counter1.dec(); // 2
counter1.dec(); // 1
var counter1_1 = init_counter();               //各自独立，两个闭包各自引用自己词法作用域的n
counter1_1.inc(); // 1
counter1_1.inc(); // 2
counter1_1.dec(); //1                       

var counter2 = init_counter(100);
counter2.inc(); // 101
counter2.inc(); // 102
counter2.inc(); // 103
counter2.dec(); // 102
counter2.dec(); // 101
counter2.dec(); // 100



//官方文档示例：定义公共函数，模块模式
var Counter = (function() {
        var privateCounter = 0;
        function changeBy(val) {
                privateCounter += val;
        }
        return {
                increment: function() {
                        changeBy(1);
                },
                decrement: function() {
                        changeBy(-1);
                },
                value: function() {
                        return privateCounter;
                }
        }   
})();      
console.log(Counter.value()); // 0 
Counter.increment();
Counter.increment();
console.log(Counter.value()); // 2
Counter.decrement();
console.log(Counter.value()); // 1