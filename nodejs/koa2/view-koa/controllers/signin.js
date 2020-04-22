
//处理登录请求

module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';                                                         //拿到post的数据
        if (email === 'lis@waspinc.com' && password === '123456') {                             //做一个简单验证，还未涉及到Node环境下操作数据库
            console.log('signin ok!');
            ctx.render('signin-ok.html', {                                                                              //成功登录，渲染
                title: 'Sign In OK',
                name: 'Mr Node'
            });
        } else {
            console.log('signin failed!');
            ctx.render('signin-failed.html', {                                                                                  //登录失败，渲染
                title: 'Sign In Failed'
            });
        }
    }
};