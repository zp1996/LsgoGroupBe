const bcrypt = require('bcrypt'),
    { addUser, findUser } = require('../models/user'),
    { badRequest } = require('../helpers/utils'),
    RE = require('../helpers/pattern');

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
        const err = await addUser(ctx.request.body);
        if (err == null) {
            ctx.body = {
                test: true
            };
        } else  {
            badRequest(ctx, err.msg);
        }
    });

    router.post('/login', async ctx => {
        const flag = baseJudge(ctx);
        if (!flag) return flag;
        const { email, password } = ctx.request.body;
        const user = await findUser({ email });
        if (user.length === 0) {
            return badRequest(ctx, '该邮箱未注册！');
        } else {
            const { password } = user[0],
                flag = await bcrypt.compare(password, password);
            if (!flag) {
                return badRequest(ctx, '密码错误！');
            }
        }
        ctx.body = {
            test: true
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
