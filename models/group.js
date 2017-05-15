const Sequelize = require('sequelize'),
    { BaseGet, getErrorMsg } = require('../helpers/model'),
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
    const groups = await Groups.findAll({
        attributes: ['name', 'number', 'leader', 'mentor'],
        where: { status: 1 }
    });
    const res = [];
    for (let group of groups) {
        res.push({
            name: group.name,
            number: group.number,
            leader: group.leader,
            mentor: group.mentor
        });
    }
};
