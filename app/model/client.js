'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const Client = app.model.define('Client', {
        //客户ID
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //关联业务员ID
        userId: {
            type: STRING(255),
            field: 'user_id'
        },
        //客户姓名
        clientName: {
          type: STRING(64),
          field: 'client_name'
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
        tableName: 'client_info',
        timestamps: true,
    });
    return Client;
};
