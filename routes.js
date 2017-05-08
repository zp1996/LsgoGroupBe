const user = require('./controllers/user');

const notFound = (ctx) => {
    console.log(true);
    ctx.status = 404;
    ctx.body = {
        msg: 'Not Found'
    };
};

module.exports = router => {

    user(router);

    router.get('*', notFound);
    router.post('*', notFound);
};
