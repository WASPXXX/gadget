const fs = require('fs');

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {                                
        if (url.startsWith('GET ')) {
            var path = url.substring(4);                                                                //提取第五个字符至后面的内容，即pathname
            router.get(path, mapping[url]);                                                        //.js文件中export的函数即作为get的第二个参数
            console.log(`register URL mapping: GET ${path}`);                    //打印方法以及路径信息
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);                  //同理
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {  
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {  //用readdirSync读取文件，这里是同步操作，因为只需在启动时运行一次
        return f.endsWith('.js');                                               //对返回的数组用filter方法过滤出.js的文件
    }).forEach((f) => {                                                             // 处理 每个.js文件
        console.log(`process controller: ${f}...`);                //打印模块信息
        let mapping = require(__dirname + '/' + dir + '/' + f);          //调用模块
        addMapping(router, mapping);                           //注册每个URL
    });
}

module.exports = function (dir) {             
    let
        controllers_dir = dir || 'controllers',                 //dir即模块所在文件夹名，默认为controllers
        router = require('koa-router')();                          //调用koa-router模块，直接作函数调用
    addControllers(router, controllers_dir);               //处理每个URL
    return router.routes();
};