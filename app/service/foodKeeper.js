'use strict';

const Service = require('egg').Service;

class FoodKeeperService extends Service {
    async queryList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const FoodKeeper = ctx.model.FoodKeeper;
        const Attachment = ctx.model.Attachment;
        FoodKeeper.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                foodKeeperName: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            FoodKeeper.findAll({
                where: whereCondition,
            }),
            FoodKeeper.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'headerPic',
                    'detailPic',
                    'foodKeeperName',
                    'telephone',
                    'keeperName',
                    'IDNumber',
                    'phone',
                    'foodKeeperAddress',
                    'mark',
                    'businessStatus',
                    'businessStatusText',
                    'state',
                    'updateBy',
                    'createBy',
                    'updated_at',
                    'created_at'
                ],
                include: [{
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

    async queryMobileList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const FoodKeeper = ctx.model.FoodKeeper;
        const Attachment = ctx.model.Attachment;
        FoodKeeper.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {hotelId} = params;

        const dataList = await FoodKeeper.findAll({
            where: {
                hotelId,
                state: 2
            },
            attributes: [
                'id',
                'headerPic',
                'detailPic',
                'foodKeeperName',
                'IDNumber',
                'keeperName',
                'telephone',
                'phone',
                'foodKeeperAddress',
                'mark',
                'businessStatus',
                'businessStatusText',
                'checkStatus',
                'updateBy',
                'createBy',
                'updated_at',
                'created_at'
            ],
            include: [{
                model: Attachment,
                attributes: ['id', 'fileType']
            }],
            order: [
                ['created_at', 'DESC']
            ]
        });

        return dataList;
    }

    async queryListTop3() {
        const ctx = this.ctx;
        const FoodKeeper = ctx.model.FoodKeeper;
        const Attachment = ctx.model.Attachment;
        FoodKeeper.belongsTo(Attachment, {foreignKey: 'thumbnail'});

        const dataList = await FoodKeeper.findAll({
            attributes: [
                'id',
                'thumbnail',
                'foodKeeperLastTime',
                'foodKeeperHas',
                'foodKeeperLimiteNumber',
                'foodKeeperBeginTime',
                'foodKeeperEndTime',
                'manPrice',
                'foodKeeperFrom',
                'foodKeeperTo',
                'foodKeeperUsecar',
                'linePlay',
                'foodKeeperDesc',
                'state',
                'updateBy',
                'createBy',
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

    async queryDetail(params) {
        const ctx = this.ctx;
        const FoodKeeper = ctx.model.FoodKeeper;
        const {id} = params;
        const res = await ctx.model.FoodKeeper.findOne({
            where: {
                id
            }
        });

        return res;
    }

    async add(fieldsValue) {
        const ctx = this.ctx;
        fieldsValue.state = 0;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.FoodKeeper.create(row);

        return {
            rowsAffected: res,
        };
    }

    async update(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.FoodKeeper.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async check(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.FoodKeeper.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async delete(params) {
        const res = await this.ctx.model.FoodKeeper.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async check(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.FoodKeeper.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }
}

module.exports = FoodKeeperService;
