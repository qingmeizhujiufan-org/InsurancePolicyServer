'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, STRING, DATE} = app.Sequelize;
    const Thumbup = app.model.define('Thumbup', {
        //被点赞人ID
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //点赞人ID
        userId: {
            type: STRING(255),
            field: 'user_id'
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
        tableName: 'thumbup_info',
        timestamps: true,
    });
    return Thumbup;
};
