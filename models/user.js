const Sequelize = require('sequelize'),
    bcrypt = require('bcrypt'),
    sequelize = require('./sequelize'),
    { BaseGet, getErrorMsg, BaseDelete, getAllRows } = require('../helpers/model'),
    { get } = require('../helpers/cache'),
    saltRounds = 10;

const Users = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        get: BaseGet('username')
    },
    email: {
        type: Sequelize.STRING,
        get: BaseGet('email')
    },
    password: {
        type: Sequelize.STRING,
        get: BaseGet('password')
    },
    status: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.INTEGER
    }
});
exports.Users = Users;

const BaseUserInfo = user => ({
    email: user.email,
    username: user.username,
    password: user.password
});

const findAllUser = async () => {
    const attributes = ['id', 'username', 'email', 'type', 'group'];
    const users = await Users.findAll({
        attributes: ['id', 'username', 'email'],
        where: { status: 1 }
    });
    return getAllRows(users, attributes);
};
exports.findAllUser = get(findAllUser).bind(null, 'users');

exports.findUserById = async id => {
    const user = await Users.findById(id, {
        attributes: ['username', 'email', 'password']
    });
    return user && BaseUserInfo(user);
};

const findUser = async (conditions, attributes = ['id', 'username', 'email', 'password']) => {
    const users = await Users.findAll({
        where: conditions,
        attributes
    });
    const res = [];
    if (users != null) {
        for (let user of users) {
            res.push(BaseUserInfo(user));
        }
    }
    return res;
};
exports.findUser = findUser;

exports.addUser = async ({ username, email, password }) => {
    const users = await findUser({
        '$or': [ { username }, { email } ]
    });
    let res = null;
    if (users.length) {
        if (username === users[0].username) {
            res = getErrorMsg('用户名被占用');
        } else if (email === users[0].email) {
            res = getErrorMsg('邮箱被占用');
        }
    } else {
        password = await bcrypt.hash(password, saltRounds);
        res = await Users.create({
            username,
            email,
            password,
            status: 1
        }).get('id');
    }
    return res;
};

exports.deleteUser = BaseDelete(Users, '该用户不存在！');
