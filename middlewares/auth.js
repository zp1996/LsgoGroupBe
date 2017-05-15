const jwt = require('jsonwebtoken');

const verify = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, sercet, (err, decoded) => {
        if (err) {
            reject(err);
        } else {
            resolve(decoded);
        }
    });
});

module.exports = () => {
    return async (ctx, next) => {
        const { url } = ctx;
        if (url === '/login' || url === '/register') {
            await next();
        } else {
            const { token } = ctx.request.body;
            try {
                ctx.hasLogin = Boolean(await verify(token));
                await next();
            } catch (err) {
                ctx.body = { login: false };
            }
        }
    };
};
