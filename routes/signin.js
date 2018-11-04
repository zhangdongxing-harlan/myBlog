const Router = require('koa-router');
const mongoDB =require('../middlewares/db')
const checkLogin = require('../middlewares/check.js')
const router = new Router();

router.get('/',async (ctx,next)=>{
    await ctx.render('signin');
})
router.post('/',async (ctx,next)=>{
    ctx.session.userInfo = ctx.request.body;
    if(await checkLogin(ctx)){
        await ctx.render('setAlert',{
            info:'登录成功'
        });    
    }
})

module.exports = router;