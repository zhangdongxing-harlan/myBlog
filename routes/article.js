const Router = require('koa-router');
const mongoDB =require('../middlewares/db')
const checkLogin = require('../middlewares/check.js')
const router = new Router();
const marked = require('marked');
router.get('/:_id',async (ctx,next)=>{
    let article = ctx.params;
    article._id=mongoDB.getObjectID(article._id);
    let item = await mongoDB.find('Article',article);
    item[0].content = marked(item[0].content);
    await ctx.render('article',{item:item[0]});
})


module.exports = router;