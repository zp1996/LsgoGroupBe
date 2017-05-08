const Sequelize = require('sequelize');

const getSequelize = () =>
    new Sequelize('lsgo', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            underscored: true
        },
        pool: {
            max: 10,
            min: 0,
            idle: 20000
        }
    });

module.exports = getSequelize();
