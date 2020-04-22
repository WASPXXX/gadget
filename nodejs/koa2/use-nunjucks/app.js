const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {      //从文件系统即path路径中加载模板，并带有opts选项noCache和watch
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,                                         //env的第二个参数，带有自动转义和异常处理两个选项
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {                                                                   //
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);                                 //添加名为f的自定义过滤器
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html', {
    name: 'Nunjucks',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
});

console.log(s);

console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));