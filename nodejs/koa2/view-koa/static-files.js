const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');                                    //使用了mz模块而非node得fs模块
                                                                                        //但是fs使用了回调，而mz封装了fs的函数，并用Promise实现
                                                                                        //这样就可以简单地用 await调用fs的函数而不需要任何回调
                                                                                        

function staticFiles(url, dir) {                                                                //url即前缀'/static/',   dir即目录 __dirname + '/static'
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith(url)) {                                                            //是否以指定url开头
            let fp = path.join(dir, rpath.substring(url.length));               //获取文件的完整路径
            if (await fs.exists(fp)) {                                                                   //判断文件是否存在
                ctx.response.type = mime.lookup(rpath);                                 //查找文件的mime
                ctx.response.body = await fs.readFile(fp);                              //读取文件内容并赋值给response.body
            } else {
                ctx.response.status = 404;                              //文件不存在
            }
        } else {
            await next();                                                       //非指定的url，则执行下一个middleware
        }
    };
}

module.exports = staticFiles;