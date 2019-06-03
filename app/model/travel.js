'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE, TEXT} = app.Sequelize;
    const Travel = app.model.define('Travel', {
        /* 旅游ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
        /* 商家ID */
        travelkeeperId: {
            type: UUIDV1,
            field: 'travelkeeper_id'
        },
        /* 旅游缩略图 */
        thumbnail: {
            type: STRING(255),
            field: 'thumbnail'
        },
        /* 旅游图 */
        headerPic: {
            type: STRING(255),
            field: 'header_pic'
        },
        /* 旅游详情图 */
        detailPic: {
            type: STRING(255),
            field: 'detail_pic'
        },
        /* 旅游主题 */
        travelTheme: {
            type: STRING(255),
            field: 'travel_theme'
        },
        /* 咨询电话 */
        telephone: {
            type: STRING(255),
            field: 'telephone'
        },
        /* 旅游时间 */
        travelLastTime: {
            type: STRING(255),
            field: 'travel_last_time'
        },
        /* 包含元素 */
        travelHas: {
            type: STRING(255),
            field: 'travel_has'
        },
        /* 限行人数 */
        travelLimiteNumber: {
            type: DECIMAL,
            field: 'travel_limite_number'
        },
        /* 旅游开始时间 */
        travelBeginTime: {
            type: DATE,
            field: 'travel_begin_time',
            get() {
                return this.getDataValue('travelBeginTime') && Moment(this.getDataValue('travelBeginTime')).format('YYYY-MM-DD');
            }
        },
        /* 旅游结束时间 */
        travelEndTime: {
            type: DATE,
            field: 'travel_end_time',
            get() {
                return this.getDataValue('travelEndTime') && Moment(this.getDataValue('travelEndTime')).format('YYYY-MM-DD');
            }
        },
        /* 旅游成人价格 */
        manPrice: {
            type: DECIMAL,
            field: 'man_price'
        },
        /* 旅游未成人价格 */
        childPrice: {
            type: DECIMAL,
            field: 'child_price'
        },
        /* 出发地 */
        travelFrom: {
            type: STRING(255),
            field: 'travel_from'
        },
        /* 目的地 */
        travelTo: {
            type: STRING(255),
            field: 'travel_to'
        },
        /* 旅游用车 */
        travelUsecar: {
            type: STRING(255),
            field: 'travel_usecar'
        },
        /* 线路游玩 */
        linePlay: {
            type: STRING(255),
            field: 'line_play'
        },
        /* 旅游详情介绍 */
        travelDesc: {
            type: TEXT,
            field: 'travel_desc'
        },
        /* 费用说明 */
        expenseDesc: {
            type: TEXT,
            field: 'expense_desc'
        },
        /* 路线须知 */
        lineInfo: {
            type: TEXT,
            field: 'line_info'
        },
        /* 审核状态*/
        state: {
            type: INTEGER,
            field: 'state'
        },
        /* 是否推荐 */
        isRecommend: {
            type: INTEGER,
            field: 'is_recommend'
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
        tableName: 'travel_info',
        timestamps: true,
    });
    return Travel;
};
