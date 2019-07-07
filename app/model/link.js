'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const Link = app.model.define('Link', {
        //积分商城链接
        pointMallUrl: {
            type: STRING(255),
            field: 'point_mall_url'
        },
        //客户咨询链接
        customerConsultUrl: {
            type: STRING(255),
            field: 'customer_consult_url'
        },
        //意见反馈链接
        feedbackUrl: {
            type: INTEGER,
            field: 'feedback_url'
        },
        //关于链接
        aboutUrl: {
            type: INTEGER,
            field: 'about_url'
        }
    }, {
        freezeTableName: true,
        tableName: 'link_info'
    });
    return Link;
};
