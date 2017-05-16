const { findAllGroup } = require('../models/group'),
    { handleDB } = require('../helpers/utils');

module.exports = router => {
    router.get('/team', async ctx => {
        const res = await handleDB(findAllGroup);
        ctx.status = res.status;
        ctx.body = res.data;
    });
};
