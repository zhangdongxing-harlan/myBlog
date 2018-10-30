const Router = require('koa-router');
const mongoDB =require('../middlewares/db');
const checkLogin = require('../middlewares/check.js');
const router = new Router();

router.get('/',async (ctx,next)=>{
    await ctx.render('about');
});

router.get('/aboutme',async (ctx,next)=>{
    await ctx.render('about');
})
router.get('/album',async (ctx,next)=>{
    await ctx.render('listpic');
})
module.exports = router;