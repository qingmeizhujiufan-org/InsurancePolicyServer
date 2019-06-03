'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, STRING, DECIMAL, DATE} = app.Sequelize;
    const TravelDay = app.model.define('TravelDay', {
        /* 旅游每天ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1
        },
        /* 主题旅游ID */
        travelId: {
            type: UUIDV1,
            field: 'travel_id'
        },
        /* 每天日期 */
        dayTime: {
            type: DATE,
            field: 'day_time'
        },
        /* 起点 */
        dayFrom: {
            type: STRING(64),
            field: 'day_from'
        },
        /* 目的地 */
        dayTo: {
            type: STRING(64),
            field: 'day_to'
        },
        /* 当日车程 */
        dayDrive: {
            type: STRING(64),
            field: 'day_drive'
        },
        /* 住宿 */
        dayStay: {
            type: STRING(255),
            field: 'day_stay'
        },
        /* 包含用餐 */
        dayDinner: {
            type: STRING(64),
            field: 'day_dinner'
        },
        /* 旅游内容 */
        dayPlay: {
            type: DECIMAL,
            field: 'day_play'
        },
        /* 修改人 */
        updateBy: {
            type: STRING(255),
            field: 'update_by'
        },
        /* 创建人 */
        createBy: {
            type: STRING(255),
            field: 'create_by'
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
        tableName: 'travel_day_info',
        timestamps: true,
    });
    return TravelDay;
};
