'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE, DATETIME, DECIMAL} = app.Sequelize;
    const Order = app.model.define('Order', {
        //id
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //客户ID
        clientId: {
            type: STRING(255),
            field: 'client_id'
        },
        //业务员ID
        userId: {
            type: STRING(255),
            field: 'user_id'
        },
        //保险单号
        insurancePolicyNo: {
            type: STRING(19),
            field: 'insurance_policy_no'
        },
        //险种
        insuranceName: {
            type: STRING(64),
            field: 'insurance_name'
        },
        //保险公司
        insuranceCompany: {
            type: STRING(64),
            field: 'insurance_company'
        },
        //投保时间
        insuredTime: {
            type: DATETIME,
            field: 'insured_time'
        },
        //缴费年限
        paymentDuration: {
            type: INTEGER,
            field: 'payment_duration'
        },
        //保额
        insuredSum: {
            type: DECIMAL,
            field: 'insured_sum'
        },
        //保费
        insurance: {
            type: DECIMAL,
            field: 'insurance',
        },
        //备注
        mark: {
            type: STRING(1000),
            field: 'mark'
        },
        //订单渠道
        orderChannel: {
          type: STRING(64),
          field: 'order_channel'
        },
        //投保人姓名
        policyholderName: {
          type: STRING(64),
          field: 'policyholder_name'
        },
        //投保人性别
        policyholderSex: {
            type: INTEGER,
            field: 'policyholder_sex'
        },
        //投保人生日
        policyholderBirthday: {
            type: DATE,
            field: 'policyholder_birthday'
        },
        //投保人电话号码
        policyholderTelephone: {
            type: STRING(64),
            field: 'policyholder_telephone'
        },
        //被保人姓名
        insuredName: {
            type: STRING(64),
            field: 'insured_name'
        },
        //投保人性别
        insuredSex: {
            type: INTEGER,
            field: 'insured_sex'
        },
        //投保人生日
        insuredBirthday: {
            type: DATE,
            field: 'insured_birthday'
        },
        //投保人电话号码
        insuredTelephone: {
            type: STRING(64),
            field: 'insured_telephone'
        },
        //受益人姓名
        beneficiaryName: {
          type: STRING(64),
          field: 'beneficiary_name'
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
        tableName: 'user_info',
        timestamps: true,
    });
    return Order;
};
