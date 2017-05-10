exports.badRequest = (ctx, msg = '非法请求！') => {
    ctx.status = 400;
    ctx.body = { msg };
};
