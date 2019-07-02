'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');
const Moment = require('moment');

const { getYearRange, getMonthRange, getQuarterRange } = require('../extend/util');

class orderService extends Service {

  async queryList(params) {
    const ctx = this.ctx;
    const Order = ctx.model.Order;
    const Op = this.app.Sequelize.Op;

    const { pageNumber = 1, pageSize = 10, keyWords = '', beginDate, endDate, ...rest } = params;
    const whereCondition = {
      '$or': {
        insurancePolicyNo: {
          '$like': '%' + keyWords + '%'
        },
        insuranceName: {
          '$like': '%' + keyWords + '%'
        },
        policyholderName: {
          '$like': '%' + keyWords + '%'
        },
        insuredName: {
          '$like': '%' + keyWords + '%'
        },
        beneficiaryName: {
          '$like': '%' + keyWords + '%'
        },
      },
      '$and': {}
    };
    if (beginDate && endDate) {
      whereCondition['$and']['insuredTime'] = {
        [Op.between]: [new Date(`${beginDate} 00:00:00`), new Date(`${endDate} 23:59:59`)]
      };
    }
    console.log('rest == ', rest);
    for (let key in rest) {
      if (rest[key]) {
        whereCondition['$and'][key] = rest[key];
      }
    }
    console.log('whereCondition == ', whereCondition);
    const dataList = await Promise.all([
      Order.findAll({
        where: whereCondition,
      }),
      Order.findAll({
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

  async queryOrderMonthSum(params) {
    const Sequelize = this.app.Sequelize;
    const Op = Sequelize.Op;
    const range = getMonthRange();

    const res = await this.ctx.model.Order.findAll({
      attributes: ['insurance'],
      where: {
        '$and': {
          insuredTime: {
            [Op.between]: [range.beginDate, range.endDate]
          },
          userId: params.id,
        }
      }
    });
    return res;
  }


  async queryOrderQuarterSum(params) {
    const Sequelize = this.app.Sequelize;
    const Op = Sequelize.Op;
    const range = getQuarterRange();

    const res = await this.ctx.model.Order.findAll({
      attributes: ['insurance'],
      where: {
        '$and': {
          insuredTime: {
            [Op.between]: [range.beginDate, range.endDate]
          },
          userId: params.id,
        }
      }
    });
    return res;
  }

  async queryOrderYearSum(params) {
    const Sequelize = this.app.Sequelize;
    const Op = Sequelize.Op;
    const range = getYearRange();
    const res = await this.ctx.model.Order.findAll({
      attributes: ['insurance'],
      where: {
        '$and': {
          insuredTime: {
            [Op.between]: [range.beginDate, range.endDate]
          },
          userId: params.id,
        }
      }
    });
    return res;
  }

  async add(params) {
    const res = await this.ctx.model.Order.create(params);
    return res;
  }

  async update(params) {
    const res = await this.ctx.model.Order.update(params, {
      where: { id: params.id }
    });
    return res;
  }

  async queryOne(params) {
    const { id, userId } = params;
    const res = await this.ctx.model.Order.findOne({
      where: {
        id,
        userId
      }
    });
    return res;
  }

  async delete(params) {
    const res = await this.ctx.model.Order.destroy({
      where: { id: params.id }
    });
    return res;
  }

  async findByInsurancePolicyNo(params) {
    const order = await this.ctx.model.Order.findOne({
      where: params
    });
    return order;
  }
}

module.exports = orderService;