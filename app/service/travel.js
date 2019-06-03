'use strict';

const Service = require('egg').Service;

class TravelService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Travel = ctx.model.Travel;
        const TravelSign = ctx.model.TravelSign;
        const Attachment = ctx.model.Attachment;
        Travel.hasMany(TravelSign, {foreignKey: 'travelId'});
        Travel.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = '', travelBeginTime, travelEndTime, ...rest} = params;
        const whereCondition = {
            '$or': {
                travelTheme: {
                    '$like': '%' + keyWords + '%'
                },
            },
            '$and': {}
        };
        if (travelBeginTime && travelEndTime) {
            whereCondition['$and']['travelBeginTime'] = {'$gte': travelBeginTime};
            whereCondition['$and']['travelEndTime'] = {'$lte': travelEndTime};
        }
        for (let key in rest) {
            if (rest[key]) {
                whereCondition['$and'][key] = rest[key];
            }
        }

        const dataList = await Promise.all([
            Travel.findAll({
                where: whereCondition,
            }),
            Travel.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'thumbnail',
                    'travelTheme',
                    'travelLastTime',
                    'travelHas',
                    'travelLimiteNumber',
                    'travelBeginTime',
                    'travelEndTime',
                    'manPrice',
                    'travelFrom',
                    'travelTo',
                    'travelUsecar',
                    'linePlay',
                    'travelDesc',
                    'state',
                    'isRecommend',
                    'updateBy',
                    'createBy',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: TravelSign,
                    attributes: ['travelId']
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
        const Travel = ctx.model.Travel;
        const TravelSign = ctx.model.TravelSign;
        const Attachment = ctx.model.Attachment;
        Travel.hasMany(TravelSign, {foreignKey: 'travelId'});
        Travel.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = '', ...rest} = params;
        const whereCondition = {
            '$or': {
                travelTheme: {
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
            Travel.findAll({
                where: whereCondition,
            }),
            Travel.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'thumbnail',
                    'travelTheme',
                    'travelLastTime',
                    'travelHas',
                    'travelLimiteNumber',
                    'travelBeginTime',
                    'travelEndTime',
                    'manPrice',
                    'travelFrom',
                    'travelTo',
                    'travelUsecar',
                    'linePlay',
                    'travelDesc',
                    'state',
                    'isRecommend',
                    'updateBy',
                    'createBy',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: TravelSign,
                    attributes: ['travelId']
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

    async queryListTop3() {
        const ctx = this.ctx;
        const Travel = ctx.model.Travel;
        const Attachment = ctx.model.Attachment;
        Travel.belongsTo(Attachment, {foreignKey: 'thumbnail'});

        const dataList = await Travel.findAll({
            where: {
                state: 2,
                isRecommend: 1
            },
            attributes: [
                'id',
                'thumbnail',
                'travelTheme',
                'travelLastTime',
                'travelHas',
                'travelLimiteNumber',
                'travelBeginTime',
                'travelEndTime',
                'manPrice',
                'travelFrom',
                'travelTo',
                'travelUsecar',
                'linePlay',
                'travelDesc',
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
        const Travel = ctx.model.Travel;
        const TravelDay = ctx.model.TravelDay;
        const TravelSign = ctx.model.TravelSign;
        Travel.hasMany(TravelSign, {foreignKey: 'travelId'});
        const {id} = params;
        const res = await ctx.model.Travel.findOne({
            where: {
                id
            },
            include: [{
                associate: Travel.hasMany(TravelDay, {foreignKey: 'travelId', sourceKey: 'id'}),
                model: TravelDay,
            }, {
                associate: Travel.hasMany(TravelSign, {foreignKey: 'travelId', sourceKey: 'id'}),
                model: TravelSign,
            }]
        });

        return res;
    }

    async add(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            state: 0,
            checkStatus: 0,
            ...fieldsValue
        };
        const res = await ctx.model.Travel.create(row);

        return {
            rowsAffected: res,
        };
    }

    async update(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.Travel.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async check(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.Travel.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }


    async delete(params) {
        const res = await this.ctx.model.Travel.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async addTravelDay(fieldsValueList) {
        const ctx = this.ctx;
        const res = await ctx.model.TravelDay.bulkCreate(fieldsValueList);

        return {
            rowsAffected: res,
        };
    }

    async updateTravelDay(fieldsValueList) {
        const ctx = this.ctx;
        let updateList = [];
        for (let i = 0; i < fieldsValueList.length; i++) {
            let item = fieldsValueList[i];
            updateList.push(
                ctx.model.TravelDay.update(item, {
                    where: {id: item.id}
                })
            );
        }
        const res = await Promise.all(updateList);

        return {rowsAffected: res};
    }

    async delete(params) {
        const res = await this.ctx.model.Travel.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async deleteTravelDay(params) {
        const res = await this.ctx.model.TravelDay.destroy({
            where: {travelId: params.id}
        });
        return res;
    }

    /* 报名自驾游 */
    async signTravel(fieldsValue) {
        const ctx = this.ctx;
        fieldsValue.orderId = `${new Date().getTime()}${fieldsValue.userId.substr(-4)}`;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.TravelSign.create(row);

        return {
            rowsAffected: res,
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
        TravelSign.hasMany(TravelSignParticipant, {foreignKey: 'travelSignId'});
        const {pageNumber = 1, pageSize = 10, keyWords = '', ...rest} = params;
        const whereCondition = {
            '$or': {
                orderId: {
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

    /* 查询订单详情 */
    async queryOrderDetail(params) {
        const ctx = this.ctx;
        const Travel = ctx.model.Travel;
        const TravelKeeper = ctx.model.TravelKeeper;
        const TravelSign = ctx.model.TravelSign;
        const TravelSignParticipant = ctx.model.TravelSignParticipant;

        TravelSign.belongsTo(Travel, {foreignKey: 'travelId', targetKey: 'id'});
        TravelSign.belongsTo(TravelKeeper, {foreignKey: 'travelkeeperId', targetKey: 'id'});
        TravelSign.hasMany(TravelSignParticipant, {foreignKey: 'travelSignId', targetKey: 'id'});
        const {id = ''} = params;

        const res = TravelSign.findOne({
            where: {id: id},
            // attributes: [
            //   'id',
            //   'thumbnail',
            //   'travelTheme',
            //   'travelLastTime',
            //   'travelHas',
            //   'travelLimiteNumber',
            //   'travelBeginTime',
            //   'travelEndTime',
            //   'manPrice',
            //   'travelFrom',
            //   'travelTo',
            //   'travelUsecar',
            //   'linePlay',
            //   'travelDesc',
            //   'updateBy',
            //   'createBy',
            //   'updated_at',
            //   'created_at',
            // ],
            include: [{
                model: Travel
            }, {
                model: TravelKeeper
            }, {
                model: TravelSignParticipant
            }]
        })

        return res;
    }

    /* 添加参与者 */
    async addParticipants(fieldsValueList) {
        const ctx = this.ctx;
        const res = await ctx.model.TravelSignParticipant.bulkCreate(fieldsValueList);

        return {
            rowsAffected: res,
        };
    }
}

module.exports = TravelService;
