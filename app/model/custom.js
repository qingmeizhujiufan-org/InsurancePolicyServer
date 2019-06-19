'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const custom = app.model.define('custom', {
        //微信用户id
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        // 业务员id
        userId: {
          type: STRING(255),
          field: 'user_id'
        },
        //真实姓名
        customName: {
          type: STRING(255),
          field: 'custom_name'
        },
        //性别
        customSex: {
            type: INTEGER,
            field: 'custom_sex'
        },
        //手机号
        customTel: {
            type: STRING(11),
            field: 'custom_tel'
        },
        //生日
        customBirth: {
            type: DATE,
            field: 'custom_birth',
            get() {
                return Moment(this.getDataValue('custom_birth')).format('YYYY-MM-DD');
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
        tableName: 'custom_info',
        timestamps: true,
    });
    return custom;
};
