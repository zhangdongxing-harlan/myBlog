const Router = require('koa-router');
const mongoDB =require('../middlewares/db')
const checkLogin = require('../middlewares/check.js')
const router = new Router();

router.get('/',async (ctx,next)=>{
    checkLogin(ctx);
    let items = await mongoDB.find('Message');
    await ctx.render('delete',{
        items:items.reverse()
    });
})
router.get('/:id',async (ctx,next)=>{
    let data = ctx.params;
    data.id =mongoDB.getObjectID(data.id);;
    await mongoDB.delete('Message',{_id:data.id});
    await ctx.redirect('/delete');
})

module.exports = router;