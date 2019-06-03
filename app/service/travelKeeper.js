'use strict';

const Service = require('egg').Service;

class TravelKeeperService extends Service {
    async queryList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const TravelKeeper = ctx.model.TravelKeeper;
        const Attachment = ctx.model.Attachment;
        TravelKeeper.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                travelKeeperName: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            TravelKeeper.findAll({
                where: whereCondition,
            }),
            TravelKeeper.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'headerPic',
                    'detailPic',
                    'travelKeeperName',
                    'telephone',
                    'keeperName',
                    'IDNumber',
                    'phone',
                    'travelKeeperAddress',
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
        const TravelKeeper = ctx.model.TravelKeeper;
        const Attachment = ctx.model.Attachment;
        TravelKeeper.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {hotelId} = params;

        const dataList = await TravelKeeper.findAll({
            where: {
                hotelId,
                state: 2
            },
            attributes: [
                'id',
                'headerPic',
                'detailPic',
                'travelKeeperName',
                'IDNumber',
                'keeperName',
                'telephone',
                'phone',
                'travelKeeperAddress',
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
            ]
        });

        return dataList;
    }

    async queryListTop3() {
        const ctx = this.ctx;
        const TravelKeeper = ctx.model.TravelKeeper;
        const Attachment = ctx.model.Attachment;
        TravelKeeper.belongsTo(Attachment, {foreignKey: 'thumbnail'});

        const dataList = await TravelKeeper.findAll({
            attributes: [
                'id',
                'thumbnail',
                'TravelKeeperLastTime',
                'TravelKeeperHas',
                'TravelKeeperLimiteNumber',
                'TravelKeeperBeginTime',
                'TravelKeeperEndTime',
                'manPrice',
                'TravelKeeperFrom',
                'TravelKeeperTo',
                'TravelKeeperUsecar',
                'linePlay',
                'TravelKeeperDesc',
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

    /* 查询旅游订单 */
    async queryOrderList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const Travel = ctx.model.Travel;
        const TravelSign = ctx.model.TravelSign;
        const TravelSignParticipant = ctx.model.TravelSignParticipant;
        TravelSign.belongsTo(Travel, {foreignKey: 'travelId', targetKey: 'id'});
        TravelSign.hasMany(TravelSignParticipant, {foreignKey: 'id'});
        const {pageNumber = 1, pageSize = 10, keyWords = '', travelkeeperId} = params;
        const whereCondition = {
            '$or': {
                orderId: {
                    '$like': '%' + keyWords + '%'
                },
            },
            '$and': {
                travelkeeperId
            }
        };

        const dataList = await Promise.all([
            TravelSign.findAll({
                where: whereCondition,
            }),
            TravelSign.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'travelId',
                    'travelkeeperId',
                    'orderId',
                    'userId',
                    'signDate',
                    'manNum',
                    'childNum',
                    'contract',
                    'contractPhone',
                    'plateNumber',
                    'totalMoney',
                    'state',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: TravelSignParticipant
                }, {
                    model: Travel
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

    async queryDetail(params) {
        const ctx = this.ctx;
        const TravelKeeper = ctx.model.TravelKeeper;
        const {id} = params;
        const res = await ctx.model.TravelKeeper.findOne({
            where: {
                id
            }
        });

        return res;
    }

    async add(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.TravelKeeper.create(row);

        return {
            rowsAffected: res,
        };
    }

    async update(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.TravelKeeper.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async check(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.TravelKeeper.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async delete(params) {
        const res = await this.ctx.model.TravelKeeper.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async orderCheck(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.TravelSign.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }
}

module.exports = TravelKeeperService;
