module.exports = {
    username: {
        pattern: /^[\u4e00-\u9fa5]{2,4}$/,
        msg: '用户名格式错误！'
    },
    email: {
        pattern: /^(?:\w+[\-+.]+)*[a-z0-9]+@(?:\w+.)+([a-z]{2,})+$/i,
        msg: '邮箱格式错误！'
    },
    password: {
        pattern: /^\w{6,18}$/,
        msg: '密码格式错误！'
    }
};
