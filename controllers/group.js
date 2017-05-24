const {
    findAllGroup, addGroup, deleteGroup, updateGroup
} = require('../models/group');
const { responseDB, badRequest, getFields } = require('../helpers/utils');

const baseChange = async (ctx, fn) => {
    const { body } = ctx.request;
    const data = Object.keys(body).reduce((data, key) => {
        const val = body[key];
        return val === 'null' ? data : Object.assign(data, {
            [key]: val
        });
    }, {});
    const res = await fn(data);
    if (res == null || res.status !== 400) {
        getFields(
            ctx, res,
            ['id', 'name', 'number', 'leader', 'mentor']
        );
    } else {
        badRequest(ctx, res.msg);
    }
};

module.exports = router => {
    router.get('/team', async ctx => {
        await responseDB(ctx, findAllGroup);
    });

    router.post('/team/add', async ctx => {
        await baseChange(ctx, addGroup);
    });

    router.post('/team/update', async ctx => {
        await baseChange(ctx, updateGroup);
    });

    router.get('/team/del/:id', async ctx => {
        const { id } = ctx.params;
        await responseDB(ctx, deleteGroup, id);
    });
};

function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, 2000);
    });
}
