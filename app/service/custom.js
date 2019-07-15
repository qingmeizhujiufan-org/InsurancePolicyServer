'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class CustomService extends Service {

  async queryList(params) {
    const ctx = this.ctx;
    const Custom = ctx.model.Custom;
    const { pageNumber = 1, pageSize = 10, keyWords = '', ...rest } = params;
    const whereCondition = {
      '$or': {
        customName: {
          '$like': '%' + keyWords + '%'
        },
        customTel: {
          '$like': '%' + keyWords + '%'
        },
        customSex: {
          '$like': '%' + keyWords + '%'
        }
      },
      '$and': {}
    };
    for (let key in rest) {
      if (rest[key]) {
        whereCondition['$and'][key] = rest[key];
      }
    }

    const dataList = await Promise.all([
      Custom.findAll({
        where: whereCondition,
      }),
      Custom.findAll({
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
      totalPages: Math.ceil(dataList[0].length / pageSize),
      totalElements: dataList[0].length
    };
  }

  async add(params) {

    const res = await this.ctx.model.Custom.create(params);
    return res;
  }

  async update(params) {
    const res = await this.ctx.model.Custom.update(params, {
      where: { id: params.id }
    });
    return res;
  }

  async queryOne(params) {
    const { id, userId } = params;
    const res = await this.ctx.model.Custom.findOne({
      where: {
        id,
        userId
      }
    });
    return res;
  }

  async delete(params) {
    const res = await this.ctx.model.Custom.destroy({
      where: { id: params.id }
    });
    return res;
  }

  async findByName(params) {
    const custom = await this.ctx.model.Custom.findOne({
      where: params
    });
    return custom;
  }

  async findByNameAndTel(params) {
    const custom = await this.ctx.model.Custom.findOne({
      where: params
    });
    return custom;
  }

  async findByPhone(params) {
    const custom = await this.ctx.model.Custom.findOne({
      where: params
    });
    return custom;
  }

  async checkOldPassword(params) {
    const custom = await this.ctx.model.Custom.findOne({
      where: params
    });
    return custom;

  }

  async resetPassword(params) {
    const newData = {
      ...params,
      password: '000000',
    }
    const res = await this.ctx.model.Custom.update(newData, {
      where: { id: params.id }
    });
    return res;
  }

  async changePassword(params) {
    const newData = {
      id: params.id,
      password: params,
      nesPassword,
    }
    const res = await this.ctx.model.Custom.update(newData, {
      where: { id: params.id }
    });
    return res;
  }


  async frozen(params) {
    const newData = {
      ...params
    }
    const res = await this.ctx.model.Custom.update(newData, {
      where: { id: params.id }
    });
    return res;
  }
}

module.exports = CustomService;