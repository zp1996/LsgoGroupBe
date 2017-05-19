const { findAllGroup, addGroup } = require('../models/group'),
    { responseDB, badRequest, getFields } = require('../helpers/utils');

module.exports = router => {
    router.get('/team', async ctx => {
        await responseDB(ctx, findAllGroup);
    });

    router.post('/team/add', async ctx => {
        const res = await addGroup(ctx.request.body);
        console.log(res);
        if (res.status !== 400) {
            getFields(ctx, res, ['id', 'name', 'number', 'leader', 'mentor']);
        } else {
            badRequest(ctx, res.msg);
        }
    });
};

function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, 2000);
    });
}
