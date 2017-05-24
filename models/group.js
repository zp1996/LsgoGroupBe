const Sequelize = require('sequelize'),
    { BaseGet, getErrorMsg, getAllRows, BaseDelete } = require('../helpers/model'),
    sequelize = require('./sequelize'),
    { Users } = require('./user');

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
        where: { status: 1 },
        order: [
            ['updated_at', 'ASC']
        ]
    });
    return getAllRows(groups, attributes);
};

const findGroup = async (conditions) => {
    const groups = await Groups.findAll({
        where: conditions,
        attributes: ['id', 'name', 'number', 'status'],
    });
    const res = [];
    if (groups != null) {
        for (let group of groups) {
            res.push({
                id: group.id,
                name: group.name,
                status: group.status,
                root: group
            });
        }
    }
    return res;
};

exports.addGroup = async ({ name, leader, mentor }) => {
    const groups = await findGroup({ name });
    let res = null;
    if (!groups.length) {
        res = await Groups.create({
            name,
            number: 0,
            leader,
            mentor
        });
    } else {
        const group = groups[0];
        if (group.status === 1) {
            res = getErrorMsg('小组名已经存在！');
        } else {
            res = await group.root.update({
                status: 1,
                number: group.root.get('number')
            });
        }
    }
    return res;
};

exports.updateGroup = async (data) => {
    const groups = await findGroup({ id: data.id });
    if (groups.length) {
        const group = groups[0];
        res = await group.root.update(Object.assign(data, {
            number: group.root.get('number')
        }));
    } else {
        res = getErrorMsg('该小组不存在！');
    }
    return res;
};

exports.deleteGroup = BaseDelete(Groups, '该小组不存在！');
