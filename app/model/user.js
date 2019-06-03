'use strict';

const Moment = require('moment');

module.exports = app => {

    const { UUIDV1, INTEGER, STRING, DATE } = app.Sequelize;
    const User = app.model.define('User', {
        //微信用户id
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //openid
        openid: {
            type: STRING(64),
            field: 'openid'
        },
        //城市
        city: {
            type: STRING(64),
            field: 'city'
        },
        //国家
        country: {
            type: STRING(255),
            field: 'country'
        },
        //头像
        headimgurl: {
            type: STRING(255),
            field: 'headimgurl'
        },
        //语言
        language: {
            type: INTEGER,
            field: 'language'
        },
        //昵称
        nickname: {
            type: STRING(64),
            field: 'nickname'
        },
        //省份
        province: {
            type: STRING(64),
            field: 'province'
        },
        //性别
        sex: {
            type: INTEGER,
            field: 'sex'
        },
        created_at: {
            type: DATE,
            get() {
                return Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updated_at: {
            type: DATE,
            get() {
                return Moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'user_info',
        timestamps: true,
    });
    return User;
};
