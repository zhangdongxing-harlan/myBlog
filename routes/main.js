const bodyParser = require("koa-bodyparser"),
    indexRouter = require("."),
    createRouter = require("./create"),
    articleRouter = require("./article"),
    personalInfoRouter = require('./personalInfo'),
    diaryRouter = require('./diary'),
    pageRouter = require('./page'),
    messageRouter = require('./message'),
    deleteRouter = require('./delete'),
    signinRouter = require('./signin');

module.exports = function (app, router) {
    router.get("/", async (ctx, next) => {
        ctx.redirect("/index");
        await next();
    });
    router.use("/index", indexRouter.routes(), indexRouter.allowedMethods());
    router.use("/create", createRouter.routes(), createRouter.allowedMethods());
    router.use("/article", articleRouter.routes(), articleRouter.allowedMethods());
    router.use('/personalInfo', personalInfoRouter.routes(), personalInfoRouter.allowedMethods());
    router.use("/diary", diaryRouter.routes(), diaryRouter.allowedMethods());
    router.use("/page", pageRouter.routes(), pageRouter.allowedMethods());
    router.use("/message", messageRouter.routes(), messageRouter.allowedMethods());
    router.use("/delete", deleteRouter.routes(), deleteRouter.allowedMethods());
    router.use("/signin", signinRouter.routes(), signinRouter.allowedMethods());
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.routes());
};
