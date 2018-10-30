const Router = require('koa-router');
const mongoDB =require('../middlewares/db')
const checkLogin = require('../middlewares/check.js')
const router = new Router();

router.get('/',async (ctx,next)=>{
    let items = await mongoDB.find('Message');
    await ctx.render('message',{
        items:items.reverse()
    });
})
router.post('/',async (ctx,next)=>{
    await mongoDB.insert('Message',ctx.request.body);
    await ctx.redirect('/message');
    // await next();
})

module.exports = router;