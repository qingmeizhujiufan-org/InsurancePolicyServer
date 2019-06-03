'use strict';

const sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    // host: '39.104.166.165',
    port: 3306,
    database: 'wujiemalldb',
    username: 'root',
    password: 'root',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00',
};
module.exports = sequelize;
