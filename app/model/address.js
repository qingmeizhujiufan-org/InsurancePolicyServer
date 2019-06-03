'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, STRING, DATE,INTEGER } = app.Sequelize;
    const Address = app.model.define('address', {
        /* 店铺ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1
        },
        //收件人
        receiver: {
            type: STRING(255),
            field: 'recriver'
        },
        //收获地区
        region: {
            type: STRING(255),
            field: 'region'
        },
        //收获地编号
        regionCode: {
            type: STRING(255),
            field: 'region_code'
        },
        //详细地址
        subArea: {
            type: STRING(255),
            field: 'sub_area'
        },
        // 是否默认地址
        isDefault: {
            type: INTEGER,
            field: 'default'
        },
         //手机号码
        phone: {
            type: STRING(255),
            field: 'phone'
        },
    
        //地址所属
        ownerId: {
            type: STRING(255),
            field: 'owner_id'
        },
        updated_at: {
            type: DATE,
            field: 'updated_by',
            get() {
                return this.getDataValue('updated_at') && Moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        //修改时间
        created_at: {
            type: DATE,
            field: 'created_at',
            get() {
                return this.getDataValue('created_at') && Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'address_info',
        timestamps: true,
    });
    return Address;
};
