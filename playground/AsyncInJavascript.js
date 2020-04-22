// 异步操作
//顺便复习ES6前的异步操作（回调、事件、发布订阅、Promise）和ES6后的

/* 
js引擎中，负责解释和执行js代码的线程只有一个，即主线程，也即“单线程”的由来
但是实际上也还有其他的线程，比如处理ajax、处理DOM事件、定时器、读写等等
不管这些线程存在于哪里，可以看做是主线程之外的工作线程
 */
/*一个典型的异步过程
主线程发起一个异步请求，相应的工作线程接收请求并告知主线程已收到(异步函数返回)；
主线程可以继续执行后面的代码，同时工作线程执行异步任务；
工作线程完成工作后，通知主线程；
主线程收到通知后，执行一定的动作(调用回调函数)。 
 */
/*
“发起函数、回调函数”
eg. 
setTimeout(somefn, 1000); 
也并不是总是以发起函数参数的形式存在，如ajax过程
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = somefn; // 回调
xhr.open('GET', url);
xhr.send(null); // 发起
 */
/*
“通知主线程”：
消息队列（FIFO）、事件循环
主线程只会做一件事情，就是从消息队列里面取消息、执行消息，再取消息、再执行。
当消息队列为空时，就会等待直到消息队列变成非空。
而且主线程只有在将当前的消息执行完成后，才会去取下一个消息。
这种机制就叫做事件循环机制，取一个消息并执行的过程叫做一次循环。 
 */
/*
所以“事件”，也是为通知机制服务的吧 
 */

 /*
 一些异步实例 
 */
/* 
1. 原生ajax
 */

 //同步get
 var xhr01 = new XMLHttpRequest();
 xhr01.open('get', url, false);
 xhr01.send(null);
 if((xhr01.status >= 200 && xhr01.status < 300) || xhr01.status === 304) {
                alert(xhr01.responseText);
                xhr01.getAllResponseHeaders();
        } else {
                alert("not successful: " + xhr01.status);
        }

//异步get
var xhr02 = new XMLHttpRequest();
xhr02.onreadystatechange = function() {
        if (xhr02.readyState === 4) {
                if((xhr02.status >= 200 && xhr02.status < 300) || xhr02.status ===304) {
                        alert(xhr02.responseText);
                        xhr02.getAllResponseHeaders();
                        // or callback fn
                }
                else {
                        alert("not successful: " + xhr02.status);
                }
        }
};
xhr02.open("get", url, true);
xhr02.send(null);

//异步post
var xhr03 = new XMLHttpRequest();
xhr03.onreadystatechange = function() {
        if (xhr02.readyState === 4) {
                if((xhr02.status >= 200 && xhr02.status < 300) || xhr02.status ===304) {
                        alert(xhr02.responseText);
                        xhr02.getAllResponseHeaders();
                        // or callback fn
                }
                else {
                        alert("not successful: " + xhr02.status);
                }
        }
};
xhr03.open('post', url, ture);
xhr03.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  //模仿web表单做提交
var form = document.getElementById('user-info');
xhr03.send(serialize(form));

/*
2.  promise对象
 */

 //intro
function timeout(during) {
        return new Promise((resolve, reject) => {
                setTimeout(resolve, during, 'param');
        });
}

timeout(100).then((value) => {
        console.log(value);
});

//ajax 查询JSON
var getJSON = function(someurl) {      //封装了XMLHttpRequest对象
        var query_json = new Promise((resolve, reject) => {
                var client = new XMLHttpRequest();
                client.open('get', someurl);
                client.onreadystatechange = handler;
                client.responseType = 'json';
                client.setRequestHeader('Accept', 'application/json');
                client.send();

                function handler() {
                        if ( this.readyState != 4) {
                                return;
                        }
                        if( this.status === 200) {
                                resolve(this.responseText);          //resolve和reject带有参数时，会被传递
                        } else {                                                        //给回调函数then
                                reject(new Error(this.statusText));
                        }
                }
        });
        return query_json;        
};
getJSON("/post.json").then(
        data => console.log('Contents: ' + data), 
        error => console.log('sth wrong: ', error)
);
//一般不适用then的第二参数的方式定义rejected的回调函数
//更好的写法
getJSON("/post.json")
        .then(data => console.log('Contents: ' + data))
        .catch(error => console.log('sth wrong: ', error))
        .done();

//resolve的参数也可以是另一个Promise实例
var p1 = new Promise(function() {
        setTimeout(() => reject(new Error('fail')), 3000);
});
var p2 = new Promise(function() {
        setTimeout(() => resolve(p1), 1000);
});
p2.then( result => console.log(result));        
p2.catch( error => console.log(error));
/* p1会在3s后变为rejected，p2会在1s后调用了resolve
但是p2的状态取决于p1，此时p1还是pengding，所以p2不会改变
2s过后，p1 rejected，此时p2执行catch ，控制台输出'fail'*/

/* 
3. Generator函数
 */

 //intro
 function* gen() {
         yield 'this';
         yield 'is';
         yield 'a';
         return 'motorbike';
 }
 var g = gen();
 g.next(); // { value: 'this', done: false }
 g.next(); // { value: 'is', done: false }
 g.next(); // { value: 'a', done: false }
 g.next(); // { value: 'motorbike', done: false }
 g.next(); // { value: undefined, done: ture }
 g.next(); // { value: undefined, done: ture }

 //封装一个一个异步操作
 var fetch = require('node-fetch');
 function* gen1() {
         var url = 'https://api.github.com/users/github';
         var result = yield fetch(url);  //fetch API?
         console.log(result.bio);
 }
 
 var g1 = gen1();
 var result = g1.next();
result.value
        .then(data => data.json())
        .then(data => g.next(data));


//generator返回的是一个指向iterator对象的指针，可以用for...of遍历
function* foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
}
for(let v of foo()) {
        console.log(v);                            //也不再需要用next方法
}


/* 
4. async函数
 */
async function as1() {
        //
}
