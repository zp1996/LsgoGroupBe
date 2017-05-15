const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    { addUser, findUser } = require('../models/user'),
    { badRequest } = require('../helpers/utils'),
    RE = require('../helpers/pattern'),
    { sercet } = require('../config');

const baseJudge = ctx => {
    let errKey = null;
    const { body } = ctx.request;
    delete body.repassword;
    const flag = Object.keys(body)
        .every(key => {
            errKey = key;
            return RE[key].pattern.test(body[key])
        });
    return flag || badRequest(ctx, RE[errKey].msg);
};

module.exports = router => {
    router.post('/register', async ctx => {
        const flag = baseJudge(ctx);
        if (!flag) return flag;
        const res = await addUser(ctx.request.body);
        if (typeof res === 'number') {
            ctx.body = {
                token: jwt.sign({ id: res }, sercet)
            };
        } else  {
            badRequest(ctx, res.msg);
        }
    });

    router.post('/login', async ctx => {
        const flag = baseJudge(ctx);
        if (!flag) return flag;
        const { email, password: reqPassword } = ctx.request.body;
        const user = await findUser({ email }, ['id', 'password', 'type']);
        if (user.length === 0) {
            return badRequest(ctx, '该邮箱未注册！');
        } else {
            const { id, password } = user[0],
                flag = await bcrypt.compare(reqPassword, password);
            if (!flag) {
                return badRequest(ctx, '密码错误！');
            }
            ctx.body = {
                token: jwt.sign({ id }, sercet)
            };
        }
    });

    router.post('/auth', async ctx => {
        ctx.body = {
            login: ctx.hasLogin
        };
    });
};

function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, 5000);
    });
}
