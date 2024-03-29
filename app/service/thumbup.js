'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');
const Moment = require('moment');

const {getYearRange, getMonthRange, getQuarterRange} = require('../extend/util');

class ThumbupService extends Service {

    async queryLikeMonthSum(params) {
        const Sequelize = this.app.Sequelize;
        const Op = Sequelize.Op;
        const range = getMonthRange();

        const res = await this.ctx.model.Thumbup.find({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'likeNum'],
            ],
            where: {
                '$and': {
                    created_at: {
                        [Op.between]: [range.beginDate, range.endDate]
                    },
                    likeTo: params.id,
                }
            }
        });
        return res;
    }


    async queryLikeQuarterSum(params) {
        const Sequelize = this.app.Sequelize;
        const Op = Sequelize.Op;
        const range = getQuarterRange();

        const res = await this.ctx.model.Thumbup.find({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'likeNum'],
            ],
            where: {
                '$and': {
                    created_at: {
                        [Op.between]: [range.beginDate, range.endDate]
                    },
                    likeTo: params.id,
                }
            }
        });
        return res;
    }

    async queryLikeYearSum(params) {
        const Sequelize = this.app.Sequelize;
        const Op = Sequelize.Op;
        const range = getYearRange();
        const res = await this.ctx.model.Thumbup.find({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'likeNum']
            ],
            where: {
                '$and': {
                    created_at: {
                        [Op.between]: [range.beginDate, range.endDate]
                    },
                    likeTo: params.id,
                }
            }
        });
        return res;
    }

    async findById(params) {
        const res = await this.ctx.model.Thumbup.findOne({
            where: {
                thumbupId:params.thumbupId,
                userId: params.userId
            }
        });
        return res;
    }

    async add(params) {
        const res = await this.ctx.model.Thumbup.create(params);
        return res;
    }

    async update(params) {
        const res = await this.ctx.model.Thumbup.update(params, {
            where: {id: params.id}
        });
        return res;
    }
}

module.exports = ThumbupService;
