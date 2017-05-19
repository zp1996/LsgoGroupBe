exports.badRequest = (ctx, msg = '非法请求！') => {
    ctx.status = 400;
    ctx.body = { msg };
};

const handleDB = async (fn, ...data) => {
    try {
        const res = await fn.apply(null, data);
        return {
            status: 200,
            data: res
        };
    } catch(err) {
        console.log(err);
        return {
            status: 500,
            data: {
                msg: '服务器发生错误！'
            }
        };
    }
};
exports.handleDB;

exports.responseDB = async (ctx, fn, ...data) => {
    const res = await handleDB(fn, ...data);
    ctx.status = res.status;
    ctx.body = res.data;
};

exports.getFields = (ctx, row, attrs) => {
    ctx.body = attrs.reduce((obj, attr) => {
        return Object.assign(obj, {
            [attr]: row.get(attr)
        })
    }, {});
};
