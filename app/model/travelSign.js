'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE} = app.Sequelize;
    const TravelSign = app.model.define('TravelSign', {
        /* 旅游报名ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
        /* 主题旅游ID */
        travelId: {
            type: UUIDV1,
            field: 'travel_id'
        },
        /* 商家ID */
        travelkeeperId: {
            type: UUIDV1,
            field: 'travelkeeper_id'
        },
        /* 订单ID */
        orderId: {
            type: UUIDV1,
            field: 'order_id'
        },
        /* 用户ID */
        userId: {
            type: UUIDV1,
            field: 'user_id'
        },
        /* 报名团期 */
        signDate: {
            type: DATE,
            field: 'sign_date'
        },
        /* 成人报名人数 */
        manNum: {
            type: INTEGER,
            field: 'man_num'
        },
        /* 未成人报名人数 */
        childNum: {
            type: INTEGER,
            field: 'child_num'
        },
        /* 联系人 */
        contract: {
            type: STRING(32),
            field: 'contract'
        },
        /* 联系人电话 */
        contractPhone: {
            type: STRING(32),
            field: 'contract_phone'
        },
        /* 车牌号 */
        plateNumber: {
            type: STRING(11),
            field: 'plate_number'
        },
        /* 总额 */
        totalMoney: {
            type: DECIMAL,
            field: 'total_money'
        },
        /* 订单状态 */
        state: {
            type: INTEGER,
            field: 'state'
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
        tableName: 'travel_sign_info',
        timestamps: true,
    });
    return TravelSign;
};
