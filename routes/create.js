const Router = require('koa-router');
const mongoDB =require('../middlewares/db')
const checkLogin = require('../middlewares/check.js')
const router = new Router();

router.get('/',async (ctx,next)=>{
    await checkLogin(ctx);
    await ctx.render('create');
})
router.post('/',async (ctx,next)=>{
    await mongoDB.insert('Article',ctx.request.body);
    await ctx.render('setAlert',{
        info:'发表成功'
    });
})

module.exports = router;