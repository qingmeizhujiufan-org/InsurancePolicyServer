'use strict';

const Service = require('egg').Service;

class ChannelService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Channel = ctx.model.Channel;
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                channelName: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            Channel.findAll({
                where: whereCondition,
            }),
            Channel.findAll({
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

    async add(params) {
        const res = await this.ctx.model.Channel.create(params);
        return res;
    }

    async update(params) {
        const res = await this.ctx.model.Channel.update(params, {
            where: {id: params.id}
        });
        return res;
    }

    async queryOne(params) {
        const {id, userId} = params;
        const res = await this.ctx.model.Channel.findOne({
            where: {
                id,
                userId
            }
        });
        return res;
    }

    async delete(params) {
        const res = await this.ctx.model.Channel.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async findByName(params) {
        const res = await this.ctx.model.Channel.findOne({
            where: params
        });
        return res;
    }

     async findById(params) {
        const res = await this.ctx.model.Channel.findOne({
            attributes: ['channelName'],
            where: {
                id: params
            }
        });
        return res;
    }
}

module.exports = ChannelService;
