
//处理首页URL

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {                              //当然koa并没有在ctx上提供render方法，先做好代码逻辑
            title: 'Welcome'
        });
    }
};