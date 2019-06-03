'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE} = app.Sequelize;
    const TravelSignParticipant = app.model.define('TravelSignParticipant', {
        /* 旅游报名ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
        /* 团报名ID */
        travelSignId: {
            type: UUIDV1,
            field: 'travel_sign_id'
        },
        /* 姓名 */
        name: {
            type: INTEGER,
            field: 'name'
        },
        /* 身份证号码 */
        card: {
            type: INTEGER,
            field: 'card'
        },
        created_at: {
            type: DATE,
            get() {
                return this.getDataValue('created_at') && Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updated_at: {
            type: DATE,
            get() {
                return this.getDataValue('updated_at') && Moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'travel_sign_participant_info',
        timestamps: true,
    });
    return TravelSignParticipant;
};
