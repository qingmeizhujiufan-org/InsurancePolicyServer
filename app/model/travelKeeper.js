'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE, TEXT} = app.Sequelize;
    const TravelKeeper = app.model.define('TravelKeeper', {
        /* 旅游商家ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        /* 旅游商家缩略图 */
        thumbnail: {
            type: STRING(255),
            field: 'thumbnail'
        },
        /* 旅游商家图 */
        headerPic: {
            type: STRING(255),
            field: 'header_pic'
        },
        /* 旅游商家详情图 */
        detailPic: {
            type: STRING(255),
            field: 'detail_pic'
        },
        /* 旅游商家名称 */
        travelKeeperName: {
            type: STRING(255),
            field: 'travel_keeper_name'
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
            field: 'travel_keeper_telephone'
        },
        /* 固定电话 */
        phone: {
            type: STRING(32),
            field: 'travel_keeper_phone'
        },
        /* 地址 */
        travelKeeperAddress: {
            type: STRING(255),
            field: 'travel_keeper_address'
        },
        // 备注
        mark: {
            type: STRING(255),
            field: 'mark'
        },
        /* 营业状态 */
        businessStatus: {
          type: INTEGER,
          field: 'business_status'
        },
        /* 营业状态明文 */
        businessStatusText: {
          type: STRING(255),
          field: 'business_status_text'
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
        tableName: 'travel_keeper_info',
        timestamps: true,
    });
    return TravelKeeper;
};
