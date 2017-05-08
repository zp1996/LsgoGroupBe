const Sequelize = require('sequelize'),
    sequelize = require('./sequelize'),
    { getErrorMsg, BaseGet } = require('../helpers/model');

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
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

const BaseUserInfo = user => ({
    email: user.email,
    username: user.username,
    password: user.password
});

exports.findAllUser = async () => {
    const users = await Users.findAll({
        attributes: ['id', 'username'],
        where: { status: 1 }
    });
    const res = [];
    for (let user of users) {
        res.push({
            id: user.id,
            username: user.username
        });
    }
    return res;
};

exports.findUserById = async id => {
    const user = await Users.findById(id, {
        attributes: ['username', 'email', 'password']
    });
    return user && BaseUserInfo(user);
};

const findUser = async (conditions) => {
    const users = await Users.findAll({
        where: conditions,
        attributes: ['username', 'email', 'password']
    });
    const res = [];
    if (Users != null) {
        for (let user of users) {
            res.push(BaseUserInfo(user));
        }
    }
    return res;
};
exports.findUser = findUser;

exports.addUser = async (username, email, password) => {
    const users = await findUser({
        '$or': [ { username }, { email } ]
    });
    let err = null;
    if (users.length) {
        if (username === users[0].username) {
            err = getErrorMsg('用户名被占用');
        } else if (email === users[0].email) {
            err = getErrorMsg('邮箱被占用');
        }
    } else {
        await Users.create({
            username,
            email,
            password,
            status: 1
        });
    }
    return err;
};

exports.deleteUser = async id => {
    let err = null;
    const user = await Users.update({
        status: 0
    }, {
        where: { id }
    });
    Boolean(user[0]) || (err = getErrorMsg('该用户不存在'));
    return err;
};
