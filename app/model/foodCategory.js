'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE} = app.Sequelize;
    const FoodCategory = app.model.define('foodCategory', {
        /* 产品分类ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1
        },
        /* 产品分类名称 */
        foodCategoryName: {
            type: STRING(255),
            field: 'food_category_name'
        },
        /* 产品分类编码 */
        foodCategoryCode: {
            type: STRING(255),
            field: 'food_category_code'
        },
        //产品类别图片
        foodCategoryPic: {
            type: STRING(255),
            field: 'food_category_pic'
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
        tableName: 'food_category_info',
        timestamps: true,
    });
    return FoodCategory;
};
