const jwt = require('jsonwebtoken'),
    { sercet } = require('../config');

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
            const token = ctx.cookies.get('token');
            try {
                ctx.hasLogin = Boolean(await verify(token));
                await next();
            } catch (err) {
                ctx.body = { login: false };
            }
        }
    };
};
