'use strict';

const Service = require('egg').Service;

class AddressService extends Service {

  async queryList(params = {}) {
    const ctx = this.ctx;
    const Address = ctx.model.Address;

    const res = await Address.findAll({
      where: params
    })

    return res
  }

  async queryDetail(params) {
    const ctx = this.ctx;
    const { id } = params;
    const result = await ctx.model.Address.findById(id);

    return result;
  }


  async add(params) {
    const ctx = this.ctx;
    if (params.isDefault) {
      const res1 = await ctx.model.Address.update({
        isDefault: 0
      }, {
        where: { isDefault: 1 }
      })
      const res2 = await ctx.model.Address.create(params);
      return {
        rowsAffected: res2,
      };
    } else {
      const res = ctx.model.Address.create(params);
      return {
        rowsAffected: res,
      };
    }


  }

  async update(params) {
    const ctx = this.ctx;
    if (params.isDefault) {
      const res1 = await ctx.model.Address.update({
        isDefault: 0
      }, {
        where: { isDefault: 1 }
      })
      const res2 = await this.ctx.model.Address.update(params, {
        where: { id: params.id }
      });
      return {
        rowsAffected: res2,
      };
    } else {
      const res = await this.ctx.model.Address.update(params, {
        where: { id: params.id }
      });

      return { rowsAffected: res };
    }
  }

  async delete(params) {
    const { id } = params;
    const res = await this.ctx.model.Address.destroy({
      where: { id }
    });
    return res;
  }

  async updateDefault(params) {
    const res = await this.ctx.model.Address.update(params, {
      where: { isDefault: 1 }
    });

    return { rowsAffected: res };
  }
}

module.exports = AddressService;