const { addUser } = require('../models/user');

module.exports = router => {
    router.post('/register', async ctx => {
        const { username, email, password } = ctx.request.body;
        console.log(username, email, password, ctx.request.body);
        ctx.body = {
            test: true
        };
    });
};
