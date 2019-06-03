'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE, TEXT} = app.Sequelize;
    const Hotel = app.model.define('Hotel', {
        /* 民宿ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        /* 民宿缩略图 */
        thumbnail: {
            type: STRING(255),
            field: 'thumbnail'
        },
        /* 民宿图 */
        headerPic: {
            type: STRING(255),
            field: 'header_pic'
        },
        /* 民宿详情图 */
        detailPic: {
            type: STRING(255),
            field: 'detail_pic'
        },
        /* 民宿名称 */
        hotelName: {
            type: STRING(255),
            field: 'hotel_name'
        },
        /* 身份证 */
        keeperName: {
            type: STRING(255),
            field: 'keeper_name'
        },
        /* 身份证 */
        IDNumber: {
            type: STRING(255),
            field: 'ID_number'
        },
        /* 咨询电话 */
        telephone: {
            type: STRING(32),
            field: 'telephone'
        },
        /* 固定电话 */
        hotelPhone: {
            type: STRING(32),
            field: 'hotel_phone'
        },
        /* 地址 */
        hotelAddress: {
            type: STRING(255),
            field: 'hotel_address'
        },
        /* 民宿类型 */
        hotelType: {
            type: INTEGER,
            field: 'hotel_type'
        },
        /* 民宿类型明文 */
        hotelTypeText: {
            type: STRING(255),
            field: 'hotel_type_text'
        },
        /* 民宿状态 */
        hotelStatus: {
            type: INTEGER,
            field: 'hotel_status'
        },
        /* 民宿状态明文 */
        hotelStatusText: {
            type: STRING(255),
            field: 'hotel_status_text'
        },
        // 备注
        mark: {
            type: STRING(255),
            field: 'hotel_mark'
        },
        /* 起步价 */
        initialCharge: {
            type: DECIMAL,
            field: 'initial_charge'
        },
        /* 评分 */
        grade: {
            type: DECIMAL,
            field: 'grade'
        },
        /* 审核状态 */
        state: {
            type: INTEGER,
            field: 'state'
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
        tableName: 'hotel_info',
        timestamps: true,
    });
    return Hotel;
};
