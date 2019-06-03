'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE, TEXT} = app.Sequelize;
    const HotelRoomReserve = app.model.define('HotelRoomReserve', {
        /* 民宿ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
         /* 订单ID */
        orderId: {
            type: UUIDV1,
            field: 'order_id'
        },
        /* hotel ID */
        hotelId: {
            type: STRING(255),
            field: 'hotel_id'
        },
        /* room ID */
        roomId: {
            type: STRING(255),
            field: 'room_id'
        },
        /* 客户 ID */
        userId: {
            type: STRING(255),
            field: 'user_id'
        },
         /* 商家 ID */
        hotelkeeperId: {
            type: STRING(255),
            field: 'hotelkeeper_id'
        },
        /* 开始日期 */
        beginDate: {
            type: DATE,
            field: 'begin_date'
        },
        /* 结束日期 */
        endDate: {
            type: DATE,
            field: 'end_date'
        },
        /* 住店天数 */
        days: {
            type: INTEGER,
            field: 'days'
        },
         /* 总额 */
        totalMoney: {
            type: DECIMAL,
            field: 'total_money'
        },
        /* 住点人姓名 */
        person: {
            type: STRING(32),
            field: 'person'
        },

        /* 住点人电话*/
        telephone: {
            type: STRING(11),
            field: 'telephone'
        },
        /* 订单状态*/
        status: {
            type: INTEGER,
            field: 'status'
        },
         /* 评论状态*/
        commentStatus: {
            type: INTEGER,
            field: 'comment_status'
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
        tableName: 'hotel_room_reserve_info',
        timestamps: true,
    });
    return HotelRoomReserve;
};
