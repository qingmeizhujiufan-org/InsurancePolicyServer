'use strict';

const Service = require('egg').Service;

class InsuranceCompanyService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const InsuranceCompany = ctx.model.InsuranceCompany;
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                companyName: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            InsuranceCompany.findAll({
                where: whereCondition,
            }),
            InsuranceCompany.findAll({
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
        const res = await this.ctx.model.InsuranceCompany.create(params);
        return res;
    }

    async update(params) {
        const res = await this.ctx.model.InsuranceCompany.update(params, {
            where: {id: params.id}
        });
        return res;
    }

    async queryOne(params) {
        const {id, userId} = params;
        const res = await this.ctx.model.InsuranceCompany.findOne({
            where: {
                id,
                userId
            }
        });
        return res;
    }

    async delete(params) {
        const res = await this.ctx.model.InsuranceCompany.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async findByName(params) {
        const res = await this.ctx.model.InsuranceCompany.findOne({
            where: params
        });
        return res;
    }

     async findById(params) {
        const res = await this.ctx.model.InsuranceCompany.findOne({
            attributes: ['companyName'],
            where: {
                id: params
            }
        });
        return res;
    }
}

module.exports = InsuranceCompanyService;
