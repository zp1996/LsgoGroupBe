const user = require('./controllers/user');

module.exports = router => {

    user(router);

    router.get('*', (ctx) => {
        ctx.status = 404;
        ctx.body = {
            msg: 'Not Found'
        };
    });
};
