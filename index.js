const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    KoaRouter = new require('koa-router'),
    routes = require('./routes'),
    app = new Koa(),
    router = new KoaRouter();

require(`${__dirname}/models/sequelize`);

app.use(bodyParser());

routes(router);
app.use(router['routes']());

app.listen(3210, () => {
    console.log('restful api');
});
