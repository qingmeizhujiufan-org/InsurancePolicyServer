'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const InsuranceCompany = app.model.define('InsuranceCompany', {
        //客户ID
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //公司logo
        logoUrl: {
            type: STRING(500),
            field: 'logo_url'
        },
        //公司名称
        companyName: {
            type: STRING(64),
            field: 'company_name'
        },
        //热线电话
        hotLine: {
            type: STRING(20),
            field: 'hot_line'
        },
        //备注
        mark: {
            type: STRING(255),
            field: 'mark'
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
        tableName: 'insurance_company_info',
        timestamps: true,
    });
    return InsuranceCompany;
};
