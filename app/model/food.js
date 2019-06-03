'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE} = app.Sequelize;
    const Food = app.model.define('Food', {
        /* 产品ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1
        },
        /* 产品店铺ID */
        foodkeeperId: {
            type: UUIDV1,
            field: 'foodkeeper_id'
        },
        /* 产品分类ID */
        foodCategoryId: {
            type: STRING(255),
            field: 'food_category_id'
        },
        /* 产品编码 */
        foodCode: {
            type: STRING(255),
            field: 'food_code'
        },
        /* 产品名称 */
        foodName: {
            type: STRING(255),
            field: 'food_name'
        },
        /* 产品简介 */
        foodSummary: {
            type: STRING(255),
            field: 'food_summary'
        },
        /* 产品售价 */
        foodSellingprice: {
            type: DECIMAL,
            field: 'food_sellingprice'
        },
        /* 产品成本价 */
        foodCostprice: {
            type: DECIMAL,
            field: 'food_costprice',
            get() {
                return this.getDataValue('foodCostprice') && parseFloat(this.getDataValue('foodCostprice'));
            }
        },
        /* 产品单位 */
        foodUnit: {
            type: STRING(255),
            field: 'food_unit'
        },
        /* 产品规格 */
        foodSpec: {
            type: STRING(255),
            field: 'food_spec'
        },
        /* 产品型号 */
        foodModel: {
            type: STRING(255),
            field: 'food_model'
        },
        /* 产品状态 */
        foodState: {
            type: INTEGER,
            field: 'food_state'
        },
        /* 产品产地 */
        foodOrigin: {
            type: STRING(255),
            field: 'food_origin'
        },
        /* 产品食用 */
        foodUsage: {
            type: STRING(255),
            field: 'food_usage'
        },
        /* 产品贮藏办法 */
        foodStorage: {
            type: STRING(255),
            field: 'food_storage'
        },
        /* 产品口味 */
        foodTaste: {
            type: STRING(255),
            field: 'food_taste'
        },
        /* 配送范围 */
        distributionScope: {
            type: STRING(255),
            field: 'distribution_scope'
        },
        /* 产品品牌 */
        foodBrand: {
            type: STRING(255),
            field: 'food_brand'
        },
        /* 产品配料 */
        foodBatching: {
            type: STRING(255),
            field: 'food_batching'
        },
        /* 产品保质期 */
        foodDate: {
            type: STRING(255),
            field: 'food_date'
        },
        /* 产品净含量 */
        foodNetWeight: {
            type: STRING(255),
            field: 'food_net_weight'
        },
        /* 淘宝购买链接 */
        taobaoUrl: {
            type: STRING(1000),
            field: 'taobao_url'
        },
        /* 产品缩略图 */
        thumbnail: {
            type: STRING(255),
            field: 'thumbnail'
        },
        /* 产品示意图 */
        headerPic: {
            type: STRING(500),
            field: 'header_pic'
        },
        /* 产品详情图 */
        detailPic: {
            type: STRING(500),
            field: 'detail_pic'
        },
        /* 备注 */
        mark: {
            type: STRING(255),
            field: 'mark'
        },
        /* 是否推荐 */
        isRecommend: {
          type: INTEGER,
          field: 'is_recommend'
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
        tableName: 'food_info',
        timestamps: true,
    });
    return Food;
};
