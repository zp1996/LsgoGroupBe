const Sequelize = require('sequelize'),
    { BaseGet, getErrorMsg, getAllRows, BaseDelete } = require('../helpers/model'),
    sequelize = require('./sequelize');

const Groups = sequelize.define('groups', {
    name: {
        type: Sequelize.STRING,
        get: BaseGet('name')
    },
    number: {
        type: Sequelize.INTEGER,
        get: BaseGet('number')
    },
    leader: {
        type: Sequelize.INTEGER,
        get: BaseGet('leader')
    },
    mentor: {
        type: Sequelize.INTEGER,
        get: BaseGet('mentor')
    },
    status: {
        type: Sequelize.INTEGER
    }
});

exports.findAllGroup = async () => {
    const attributes = ['id', 'name', 'number', 'leader', 'mentor'];
    const groups = await Groups.findAll({
        attributes,
        where: { status: 1 }
    });
    return getAllRows(groups, attributes);
};

const findGroup = async (conditions) => {
    const groups = await Groups.findAll({
        where: conditions,
        attributes: ['id', 'name']
    });
    const res = [];
    if (groups != null) {
        for (let group of groups) {
            res.push({
                id: group.id,
                name: group.name
            });
        }
    }
    return res;
};

exports.addGroup = async ({ name, leader, mentor }) => {
    const groups = await findGroup({ name });
    let res = null;
    if (groups.length) {
        res = getErrorMsg('小组名已经存在！');
    } else {
        res = await Groups.create({
            name,
            number: 0,
            leader,
            mentor
        });
    }
    return res;
};

exports.deleteGroup = BaseDelete(Groups, '该小组不存在！');
