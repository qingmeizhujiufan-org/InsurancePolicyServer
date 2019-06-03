'use strict';

const Service = require('egg').Service;

class FoodService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const FoodKeeper = ctx.model.FoodKeeper;
        const FoodCategory = ctx.model.FoodCategory;
        const Food = ctx.model.Food;
        const Attachment = ctx.model.Attachment;
        Food.belongsTo(FoodKeeper, {foreignKey: 'foodkeeperId'});
        Food.belongsTo(FoodCategory, {foreignKey: 'foodCategoryId'});
        Food.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = '', ...rest} = params;
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
            },
            '$and': {}
        };
        for (let key in rest) {
            if (rest[key]) {
                whereCondition['$and'][key] = rest[key];
            }
        }

        const dataList = await Promise.all([
            Food.findAll({
                where: whereCondition,
            }),
            Food.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'foodkeeperId',
                    [Sequelize.col('FoodKeeper.keeper_name'), 'keeperName'],
                    [Sequelize.col('FoodKeeper.food_keeper_address'), 'keeperAddress'],
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
                    'taobaoUrl',
                    'mark',
                    'isRecommend',
                    'state',
                    'update_by',
                    'create_by',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: FoodKeeper,
                    attributes: []
                }, {
                    model: FoodCategory,
                    attributes: []
                }, {
                    model: Attachment,
                    attributes: ['id', 'fileType']
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
            totalElements: dataList[0].length,
            totalPages: Math.ceil(dataList[0].length / pageSize)
        };
    }

    async queryAdminList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const FoodKeeper = ctx.model.FoodKeeper;
        const FoodCategory = ctx.model.FoodCategory;
        const Food = ctx.model.Food;
        const Attachment = ctx.model.Attachment;
        Food.belongsTo(FoodKeeper, {foreignKey: 'foodkeeperId'});
        Food.belongsTo(FoodCategory, {foreignKey: 'foodCategoryId'});
        Food.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = '', state} = params;
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
        if (state !== undefined && state !== null) whereCondition['$and'] = {state};

        const dataList = await Promise.all([
            Food.findAll({
                where: whereCondition,
            }),
            Food.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'foodkeeperId',
                    [Sequelize.col('FoodKeeper.keeper_name'), 'keeperName'],
                    [Sequelize.col('FoodKeeper.food_keeper_address'), 'keeperAddress'],
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
                    'taobaoUrl',
                    'mark',
                    'isRecommend',
                    'state',
                    'update_by',
                    'create_by',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: FoodKeeper,
                    attributes: []
                }, {
                    model: FoodCategory,
                    attributes: []
                }, {
                    model: Attachment,
                    attributes: ['id', 'fileType']
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
            totalElements: dataList[0].length,
            totalPages: Math.ceil(dataList[0].length / pageSize)
        };
    }

    async queryListByShopId(params) {
        const {
            pageNumber = 1,
            pageSize = 10,
            id
        } = params;
        const Food = this.ctx.model.Food;
        const dataList = await Promise.all([
            Food.findAll(),
            Food.findAll({
                where: {shopId: id},
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
            totalElements: dataList[0].length,
            totalPages: Math.ceil(dataList[0].length / pageSize)
        };
    }

    async findFoodsByShopId(params) {
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

    async check(fieldsValue) {
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

    async queryListTop3() {
        const ctx = this.ctx;
        const Food = ctx.model.Food;
        const Attachment = ctx.model.Attachment;
        Food.belongsTo(Attachment, {foreignKey: 'thumbnail'});

        const dataList = await Food.findAll({
            where: {
                '$and': {
                    state: 2,
                    isRecommend: 1
                }
            },
            attributes: [
                'id',
                'foodkeeperId',
                'foodCategoryId',
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
                'isRecommend',
                'state',
                'update_by',
                'create_by',
                'updated_at',
                'created_at',
            ],
            include: [{
                model: Attachment,
                attributes: ['id', 'fileType']
            }],
            order: [
                ['created_at', 'DESC']
            ],
            limit: 3
        });

        return {
            content: dataList,
        };
    }
}

module.exports = FoodService;
