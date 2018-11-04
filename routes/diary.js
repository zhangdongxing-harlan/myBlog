const Router = require('koa-router');
const mongoDB =require('../middlewares/db');
const checkLogin = require('../middlewares/check.js');
const router = new Router();
const marked = require('marked');

let num = 1;

router.get('/',async (ctx,next)=>{
    ctx.redirect('/diary/personalEssay');
});
router.get('/personalEssay',async (ctx,next)=>{
    let items = await mongoDB.find('Article',{type:'diary'});
    await ctx.render('diary',{
        items:items.reverse().slice(0,10),
        num:num
    });
});
router.get('/studyNotes',async (ctx,next)=>{
    let items = await mongoDB.find('Article',{type:'notes'});
    await ctx.render('notes',{
        items:items.reverse().slice(0,10),
        num:num
    });
});
router.get('/technology',async (ctx,next)=>{
    let items = await mongoDB.find('Article',{type:'technology'});
    await ctx.render('technology',{
        items:items.reverse().slice(0,10),
        num:num
    });
});

module.exports = router;