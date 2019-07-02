'use strict';

const jwt = require('jsonwebtoken');
const BaseController = require('../core/BaseController');
const { parseInt } = require('../extend/helper');

function generateToken(data, time) {
  let created = Math.floor(Date.now());
  // let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));//私钥
  let token = jwt.sign({
    data,
    exp: created + time
  }, 'shhhhh');
  return token;
}

class customController extends BaseController {

  async queryList() {
    const ctx = this.ctx;
    const params = ctx.query;
    params.pageNumber = parseInt(params.pageNumber);
    params.pageSize = parseInt(params.pageSize);
    const customList = await ctx.service.custom.queryList(params);
    this.success({
      backMsg: "获取客户列表成功！",
      backData: customList
    });
  }

  async queryOne() {
    const ctx = this.ctx;
    const params = ctx.query;
    console.log('params ===', params);

    const result = await ctx.service.custom.queryOne(params);

    if (result) {
      // const picList = await ctx.service.file.queryListByIds(result.avatarSrc);
      // result.avatarSrc = picList;
      this.success({
        backMsg: "客户详情查询成功！",
        backData: result
      });
    } else {
      this.fail({
        backMsg: "客户详情查询失败！",
      });
    }
  }

  async add() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    // console.log('params ===', params);
    const param = { 
        customName: params.customName, 
        customTel: params.customTel
    };

    const uniquecustom = await ctx.service.custom.findByNameAndTel(param);

    if (uniquecustom === null) {
      const result = await ctx.service.custom.add(params);

      if (result.dataValues) {
        this.success({
          backMsg: "新增客户成功！",
          backData: result
        });
      } else {
        this.fail({
          backMsg: "新增客户失败！"
        });
      }
    } else {
      this.fail({
        backMsg: "客户名已存在!"
      });
    }
  }

  async update() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const result = await ctx.service.custom.update(params);
   
    if (result) {
      this.success({
        backMsg: "客户信息修改成功",
      });
    } else {
      this.fail({
        backMsg: "客户信息修改失败！"
      });
    }
  }

  async delete() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    console.log('params ===', params);

    const result = await ctx.service.custom.delete(params);
    console.log('result ===', result)
    if (result) {
      this.success({
        backMsg: "客户删除成功",
      });
    } else {
      this.fail({
        backMsg: "客户删除失败！"
      });
    }
  }

  async frozen() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const isFrozen = params.isFrozen;
    const result = await ctx.service.custom.frozen(params);
    if (result) {
      this.success({
        backMsg: isFrozen ? "客户冻结成功！" : "客户解冻成功！",
        backData: result
      });
    } else {
      this.fail({
        backMsg: isFrozen ? "客户冻结成失败！" : "客户解冻失败！"
      });
    }
  }

}

module.exports = customController;