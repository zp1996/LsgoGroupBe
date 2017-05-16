const Sequelize = require('sequelize'),
    { BaseGet, getErrorMsg, getAllRows } = require('../helpers/model'),
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
