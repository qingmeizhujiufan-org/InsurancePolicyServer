'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const Channel = app.model.define('Channel', {
        //ID
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //渠道名称
        channelName: {
            type: STRING(64),
            field: 'channel_name'
        },
        //备注
        mark: {
            type: STRING(255),
            field: 'mark'
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
        tableName: 'channel_info',
        timestamps: true,
    });
    return Channel;
};
