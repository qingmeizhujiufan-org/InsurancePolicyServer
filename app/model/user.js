'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const User = app.model.define('User', {
        //微信用户id
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
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
        //真实姓名
        realname: {
            type: STRING(64),
            field: 'realname'
        },
        //昵称
        nickname: {
            type: STRING(64),
            field: 'nickname'
        },
        //密码
        password: {
            type: STRING(255),
            field: 'password'
        },
        //公司
        company: {
            type: STRING(255),
            field: 'company'
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
        //手机号
        telephone: {
            type: STRING(11),
            field: 'telephone'
        },
        //生日
        birthday: {
            type: DATE,
            field: 'birthday',
            get() {
                return Moment(this.getDataValue('birthday')).format('YYYY-MM-DD');
            }
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
