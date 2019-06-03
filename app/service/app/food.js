'use strict';

const Service = require('egg').Service;

class FoodService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const Shop = ctx.model.Shop;
        const FoodCategory = ctx.model.FoodCategory;
        const Food = ctx.model.Food;
        Food.belongsTo(Shop, {foreignKey: 'shopId'});
        Food.belongsTo(FoodCategory, {foreignKey: 'foodCategoryId'});
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                foodName: {
                    '$like': '%' + keyWords + '%'
                },
                foodBrand: {
                    '$like': '%' + keyWords + '%'
                },
                foodOrigin: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            Food.findAll({
                where: whereCondition,
            }),
            Food.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'shopId',
                    [Sequelize.col('Shop.shop_name'), 'shopName'],
                    'foodCategoryId',
                    [Sequelize.col('FoodCategory.food_category_name'), 'foodCategoryName'],
                    'foodCode',
                    'foodName',
                    'foodSummary',
                    'foodSellingprice',
                    'foodCostprice',
                    'foodUnit',
                    'foodSpec',
                    'foodModel',
                    'foodState',
                    'foodOrigin',
                    'foodUsage',
                    'foodStorage',
                    'foodTaste',
                    'distributionScope',
                    'foodBrand',
                    'foodBatching',
                    'foodDate',
                    'foodNetWeight',
                    'mark',
                    'update_by',
                    'create_by',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: Shop,
                    attributes: []
                }, {
                    model: FoodCategory,
                    attributes: []
                }],
                order: [
                    ['created_at', 'DESC']
                ],
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
            })
        ]);

        return {
            content: dataList[1],
            pageNumber,
            pageSize,
            totalElements: dataList[0].length
        };
    }

    async findFoodByShopId(params) {
        const {id} = params;
        const res = await this.ctx.model.Food.findAll({
            where: {shopId: id}
        });
        return res
    }

    async findFoodByCategoryId(params) {
        const {id} = params;
        const res = await this.ctx.model.Food.findAll({
            where: {foodCategoryId: id}
        });
        return res
    }

    async queryDetail(params) {
        const ctx = this.ctx;
        const {id} = params;
        const res = await ctx.model.Food.findById(id);

        return res;
    }

    async add(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.Food.create(row);

        return {
            rowsAffected: res,
        };
    }

    async update(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.Food.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async delete(params) {
        const res = await this.ctx.model.Food.destroy({
            where: {id: params.id}
        });
        return res;
    }

    //查询所有分类
    async queryAllCategoryList() {
        const ctx = this.ctx;
        const total = await ctx.model.FoodCategory.findAll();
        return total
    }

    //产品类别
    async queryCategoryList(params) {
        const ctx = this.ctx;
        const FoodCategory = ctx.model.FoodCategory;
        const {pageNumber, pageSize, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                foodCategoryName: {
                    '$like': '%' + keyWords + '%'
                }
            }
        };

        const dataList = await Promise.all([
            FoodCategory.findAll({
                where: whereCondition,
            }),
            FoodCategory.findAll({
                where: whereCondition,
                order: [
                    ['created_at', 'DESC']
                ],
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
            })
        ]);

        return {
            content: dataList[1],
            pageNumber,
            pageSize,
            totalElements: dataList[0].length
        };

    }

    async categoryAdd(row) {
        const ctx = this.ctx;
        const res = await ctx.model.FoodCategory.findOrCreate({
            where: {foodCategoryName: row.foodCategoryName},
            defaults: {...row}
        });

        return res;
    }

    async categoryDetail(params) {
        const ctx = this.ctx;
        const {id} = params;
        const res = await ctx.model.FoodCategory.findById(id);

        return res;
    }

    async categoryUpdate(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.FoodCategory.update(restFieldsValue, {
            where: {id}
        });

        return res;
    }

    async categoryDelete(params) {
        const {id} = params;
        const res = await this.ctx.model.FoodCategory.destroy({
            where: {id}
        });
        return res;
    }
}

module.exports = FoodService;
