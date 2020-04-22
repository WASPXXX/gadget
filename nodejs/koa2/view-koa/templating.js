const nunjucks = require('nunjucks');

function createEnv(path, opts) {                                                                                                //就是构建Nunjucks环境时编写的函数
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    var env = createEnv(path, opts);                                                                                                                           //创建env对象
    return async (ctx, next) => {                                                                                                                                  //返回一个middleware
        ctx.render = function (view, model) {                                                                                                           //ctx上绑定render方法
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));                //渲染后的内容赋值给response.body
            ctx.response.type = 'text/html';                                                                                                                  //Content-Type
        };
        await next();                                                                                                                                   //继续处理请求
    };
}

module.exports = templating;