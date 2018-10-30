const Router = require('koa-router');
const mongoDB =require('../middlewares/db')
const checkLogin = require('../middlewares/check.js')
const router = new Router();
const marked = require('marked');
router.get('/',async (ctx,next)=>{
    let items = await mongoDB.find('Article');
    await ctx.render('index',{items:items.reverse().slice(0,6)});
})

module.exports = router;