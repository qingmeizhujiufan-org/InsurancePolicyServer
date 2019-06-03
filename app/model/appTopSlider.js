'use strict';

const Moment = require('moment');

module.exports = app => {

    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const APPTopSlider = app.model.define('APPTopSlider', {
        //id
        id: {
            type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //图片id
        imgId: {
            type: STRING(64),
            field: 'img_id'
        },
        //跳转产品链接
        foodLink: {
            type: STRING(255),
            field: 'food_link'
        },
        //描述
        desc: {
            type: STRING(255),
            field: 'desc'
        },
        //顺序编号
        no: {
            type: INTEGER,
            field: 'no'
        },
        //更新人员
        updateBy: {
            type: STRING(255),
            field: 'update_by'
        },
        //创建人员
        createBy: {
            type: STRING(255),
            field: 'create_by'
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
        tableName: 'app_topslider_info',
        timestamps: true,
    });
    return APPTopSlider;
};
