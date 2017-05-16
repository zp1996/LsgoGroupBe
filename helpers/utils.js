exports.badRequest = (ctx, msg = '非法请求！') => {
    ctx.status = 400;
    ctx.body = { msg };
};

exports.handleDB = async (fn, ...data) => {
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
