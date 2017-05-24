const redis = require('../redis');

const set = (key, value) => redis.set(key, value);
exports.set = set;

const PromiseGet = (key) => new Promise((resolve, reject) => {
    redis.get(key, (err, reply) => {
        if (err || reply == null) {
            err && console.log(err);
            reject(err);
        } else {
            resolve(reply);
        }
    });
});
exports.get = (sql, handleKey = x => x) => async key => {
    try {
        return await PromiseGet(key);
    } catch (err) {
        const res = await sql(handleKey(key));
        set(key, JSON.strinres);
        return res;
    }
};
