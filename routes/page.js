const Router = require('koa-router');
const mongoDB =require('../middlewares/db')
const checkLogin = require('../middlewares/check.js')
const router = new Router();


router.get('/:type',async (ctx,next)=>{
    let num;
    let arr = ctx.params.type.split('-');
    let type = arr[0];
    let pageNumber = arr[1];
    //首页
    if(!pageNumber){
        num = 1;
        let items = await mongoDB.find('Article',{type:type})
        await ctx.render(type,{
            items:items.reverse().slice(0,10),
            num:num
        })
    //上一页到顶
    } else {
        if(pageNumber==0){
            await ctx.redirect(`/page/${type}-1`);
    //尾页
        } else if (pageNumber==99999) {
            let items = await mongoDB.find('Article',{type:type});
            let len = items.length;
            let count = len % 10 == 0 ? 10: len % 10;
            num = Number.parseInt(len/10);
            items = await mongoDB.findCount('Article',{type:type},1,count);
            await ctx.render(type,{
                items:items.reverse(),
                num:num+1
            });
     //下一页&上一页       
        } else {
            let items = await mongoDB.find('Article',{type:type});
            let len = items.length;
            //下一页到头
            if(len/10<pageNumber){
                await ctx.redirect(`/page/${type}-99999`)
            } else {
                num = pageNumber;
                let start = len - num*10 +1;
                items = await mongoDB.findCount('Article',{type:type},start,10);
                await ctx.render(type,{
                    items:items.reverse(),
                    num:Number.parseInt(num)
                });
            }
            }               
    }
   
})

module.exports = router;