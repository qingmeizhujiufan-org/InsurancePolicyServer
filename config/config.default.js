'use strict';

const sequelizeConfig = require('./config.sequelize');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '89757';

    // add your config here
    config.middleware = [];

    /* 关闭csrf */
    config.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: ['http://localhost:8000', 'http://localhost:8010']
    };

    config.cors = {
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH, OPTIONS'
    };

    config.multipart = {
        mode: 'stream',
    };

    config.sequelize = sequelizeConfig;

    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: '123456',
            db: 0
        }
    };

    config.io = {
        namespace: {
            '/': {
                connectionMiddleware: ['auth'],
                packetMiddleware: [], // 针对消息的处理暂时不实现
            },
        },

        // cluster 模式下，通过 redis 实现数据共享
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: '123456',
            db: 0
        },
    };

    return config;
};
