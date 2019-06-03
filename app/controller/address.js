'use strict';

const BaseController = require('../core/BaseController');

class AddressController extends BaseController {
  async queryList() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.address.queryList(params);
    if (result) {
      this.success({
        backData: result,
        backMsg: "查询列表成功！"
      })
    } else {
      this.fail({ backMsg: "查询失败！" });
    }
  }

  async queryDetail() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.address.queryDetail(params);

    if (result) {
      this.success({
        backData: result,
        backMsg: '查询成功！'
      });
    } else {
      this.fail({ backMsg: "查询失败！" });
    }
  }

  async add() {
    const ctx = this.ctx;
    const fieldsValue = ctx.request.body;
    fieldsValue.isDefault = fieldsValue.isDefault ? 1 : 0;

    const result = await ctx.service.address.add(fieldsValue);

    if (result.rowsAffected) {
      this.success({
        backData: result,
        backMsg: "新增地址成功！"
      });
    } else {
      this.fail({
        backMsg: "新增地址失败！"
      });
    }
  }

  async update() {
    const ctx = this.ctx;
    const fieldsValue = ctx.request.body;
    const result = await ctx.service.address.update(fieldsValue);

    if (result.rowsAffected) {
      this.success({
        backData: result,
        backMsg: "修改地址成功！"
      });
    } else {
      this.fail({
        backMsg: "修改地址失败！"
      });
    }
  }

  async delete() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    console.log('params ===', params);
    const result = await ctx.service.address.delete(params);
    console.log('result ===', result)
    if (result) {
      this.success({
        backMsg: "地址删除成功",
      });
    } else {
      this.fail({
        backMsg: "地址删除失败！"
      });
    }
  }
}

module.exports = AddressController;