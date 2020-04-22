const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';                                //定义常量，判断是否为生产环境
                                                                                                                                                        //从而决定cache的使用
// log request URL:
app.use(async (ctx, next) => {                                                                                  //#1 记录URL以及页面处理时间
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:                                                                                 //#2
if (! isProduction) {                                                                                    //生产环境下，静态文件由部署在最前的反向代理服务器（如Nginx）
    let staticFiles = require('./static-files');                                              //处理，node程序不需要处理；但是在开发环境中，我们让koa顺带
    app.use(staticFiles('/static/', __dirname + '/static'));                     //处理了静态文件，简化开发环境
}

// parse request body:
app.use(bodyParser());                                                                          //#3

// add nunjucks as view:
app.use(templating('views', {                                                               //#4
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());                                                                          //#5

app.listen(3000);
console.log('app started at port 3000...');