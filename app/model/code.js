'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, STRING, DATE} = app.Sequelize;
    const Code = app.model.define('Code', {
        //验证码记录ID
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
         //被赞人ID
        telephone: {
            type: STRING(11),
            field: 'telephone'
        },
        //点赞人ID
        code: {
            type: STRING(6),
            field: 'code'
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
        tableName: 'code_info',
        timestamps: true,
    });
    return Code;
};
