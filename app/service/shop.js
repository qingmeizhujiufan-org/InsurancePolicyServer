'use strict';

const Service = require('egg').Service;

class ShopService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Shop = ctx.model.Shop;

        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                shopName: {
                    '$like': '%' + keyWords + '%'
                },
                shopAddress: {
                    '$like': '%' + keyWords + '%'
                }
            }
        };
        const dataList = await Promise.all([
            Shop.findAll({
                where: whereCondition,
            }),
            Shop.findAll({
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

    async queryDetail(params) {
        const ctx = this.ctx;
        const {id} = params;
        const res = await ctx.model.Shop.findById(id);

        return res;
    }

    async add(row) {
        const ctx = this.ctx;
        const res = await ctx.model.Shop.findOrCreate({
            where: {shopName: row.shopName},
            defaults: {...row}
        });

        return res
    }

    async update(params) {
        const res = await this.ctx.model.Shop.update(params, {
            where: {id: params.id}
        });

        return {rowsAffected: res};
    }

    async delete(params) {
        const {id} = params;
        const res = await this.ctx.model.Shop.destroy({
            where: {id}
        });
        return res;
    }
}

module.exports = ShopService;
