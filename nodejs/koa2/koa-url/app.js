// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

const router = require('koa-router')(); //函数调用
const bodyParser = require('koa-bodyparser');

const app = new Koa();


//log request的url
app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//bodyParser middleware
app.use(bodyParser());

//使用url route
/*router.get('/hello/:name', async(ctx, next)=>{
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});*/
// action="/signin"
router.get('/', async(ctx, next)=>{
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">   
            <p>Name: <input name="logname" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});
router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.logname || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'wasp' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/"><em>Try again</em></a></p>`;
    }
});
//router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
