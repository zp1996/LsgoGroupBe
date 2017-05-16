const user = require('./controllers/user');
const group = require('./controllers/group');

const notFound = (ctx) => {
    console.log(true);
    ctx.status = 404;
    ctx.body = {
        msg: 'Not Found'
    };
};

module.exports = router => {
    user(router);
    group(router);

    router.get('*', notFound);
    router.post('*', notFound);
};
