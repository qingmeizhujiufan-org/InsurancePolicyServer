'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER,STRING, DATE} = app.Sequelize;
    const Shop = app.model.define('shop', {
        /* 店铺ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1
        },

        //店铺名称
        shopName: {
            type: STRING(255),
            field: 'shop_name'
        },
        //店铺地址
        shopAddress: {
            type: STRING(255),
            field: 'shop_address'
        },
        //店铺状态
        shopStatus: {
            type: STRING(255),
            field: 'shop_status'
        },
        //店铺拥有者
        shopOwner: {
            type: STRING(255),
            field: 'shop_owner'
        },
         //手机号码
        shopTelephone: {
            type: STRING(255),
            field: 'shop_telephone'
        },
         //固定电话
        shopPhone: {
            type: STRING(255),
            field: 'shop_phone'
        },
         //店铺微信
        shopWeixin: {
            type: STRING(255),
            field: 'shop_weixin'
        },
         //店铺备注
        mark: {
            type: STRING(255),
            field: 'mark'
        },
        //店铺图片
        shopPic: {
            type: STRING(255),
            field: 'shop_pic'
        },
         //店铺证书
        shopCertificate: {
            type: STRING(255),
            field: 'shop_certificate'
        },
        //店铺更新者
        updateBy: {
            type: STRING(255),
            field: 'update_by'
        },
            /* 审核状态 */
        checkStatus: {
          type: INTEGER,
          field: 'check_status'
        },
        //店铺创建者
        createBy: {
            type: STRING(255),
            field: 'create_by'
        },
        updated_at: {
            type: DATE,
            field: 'update_by',
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
        tableName: 'shop_info',
        timestamps: true,
    });
    return Shop;
};
