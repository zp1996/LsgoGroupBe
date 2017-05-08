const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    KoaRouter = new require('koa-router'),
    logger = require('koa-logger'),
    routes = require('./routes'),
    app = new Koa(),
    router = new KoaRouter();

require(`${__dirname}/models/sequelize`);

app.use(logger());

app.use(bodyParser());

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE');
    await next();
});

routes(router);
app.use(router['routes']());

app.listen(3210, () => {
    console.log('restful api');
});
