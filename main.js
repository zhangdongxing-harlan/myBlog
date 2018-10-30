const Koa = require('koa'),
  session = require('koa-session'),
  artTemplate = require('koa-art-template'),
  path = require('path'),
  bodyParser = require('koa-bodyparser'),
  serve = require('koa-static'),
  routes = require('./routes/main'),
  Router = require('koa-router');

const app = new Koa();
const router = new Router();

//配置art-template模板
artTemplate(app,{
  root:path.join(__dirname,'views'),
  extname:'.html',
  debug:process.env.NODE_ENV !=='production'
})

//设置静态文件目录
app.use(serve(`${__dirname}/public`));

//设置session
app.keys = ['some secret hurr']; //cookie的签名，固定写法
const CONFIG = {
     key: 'koa:sess', //默认
     maxAge: 86400000, //cookie的过期时间
     autoCommit: true, //默认
     overwrite: true, //默认
     httpOnly: true, //true表示只有服务器端可以获取
     signed: true, //默认签名
     rolling: false, //每次请求强制设置cookie,这会重置过期时间（默认false）
     renew: true, //当快过期时更新session
};
app.use(session(CONFIG, app));

//路由
routes(app,router);

app.listen(3000,function(){
  console.log(`Server is running...`)
});
