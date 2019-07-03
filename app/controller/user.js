'use strict';

const jwt = require('jsonwebtoken');
const BaseController = require('../core/BaseController');
const { parseInt } = require('../extend/helper');
const { getSum } = require('../extend/util');

function generateToken(data, time) {
  let created = Math.floor(Date.now());
  // let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));//私钥
  let token = jwt.sign({
    data,
    exp: created + time
  }, 'shhhhh');
  return token;
}

class UserController extends BaseController {

  async login() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const user = await ctx.service.user.login(params);
    if (user) {
      //生成cookie
      let token = generateToken({ _id: user.id }, 3 * 60 * 60 * 1000);
      //保存到客户端浏览器的cookie中
      ctx.cookies.set('token', token, {
        maxAge: 3 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost'
      });
      // 保存到redis
      ctx.app.redis.set('username', token);

      this.success({
        backMsg: "登录成功！",
        backData: user
      });
    } else {
      this.fail({
        backMsg: "手机号或密码不正确！"
      });
    }
  }

  async queryList() {
    const ctx = this.ctx;
    const params = ctx.query;
    params.pageNumber = parseInt(params.pageNumber);
    params.pageSize = parseInt(params.pageSize);
    const userList = await ctx.service.user.queryList(params);
    this.success({
      backMsg: "获取用户列表成功！",
      backData: userList
    });
  }

  async queryOneUser() {
    const ctx = this.ctx;
    const params = ctx.query;
    console.log('params ===', params);

    const result = await ctx.service.user.queryOneUser(params);

    if (result) {
      const picList = await ctx.service.file.queryListByIds(result.headimgurl);
      result.headimgurl = picList;
      this.success({
        backMsg: "用户详情查询成功！",
        backData: result
      });
    } else {
      this.fail({
        backMsg: "用户详情查询失败！",
      });
    }
  }

  async queryUserSum() {
    const ctx = this.ctx;
    const params = ctx.query;
    console.log('params ===', params);

    let user = await ctx.service.user.queryOneUser(params);
    let month = await ctx.service.order.queryOrderMonthSum(params);
    let quarter = await ctx.service.order.queryOrderQuarterSum(params);
    let year = await ctx.service.order.queryOrderYearSum(params);

    if (user) {
      const picList = await ctx.service.file.queryListByIds(user.headimgurl);
      user.headimgurl = picList;
      const result = {
        user,
        month,
        quarter,
        year
      }
      this.success({
        backMsg: "用户查询成功！",
        backData: result
      });
    } else {
      this.fail({
        backMsg: "用户查询失败！",
      });
    }
  }

  async add() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const { telephone, code, password } = params;

    const uniqueUser = await ctx.service.user.findByPhone({ telephone })
    // 是否注册
    if (uniqueUser === null) {
      // 验证码校验
      const check = await ctx.service.user.checkCode({
        telephone,
        code
      });

      if (check) {
        const result = await ctx.service.user.add(params);

        if (result.dataValues) {
          this.success({
            backMsg: "新增用户成功！",
            backData: result
          });
        } else {
          this.fail({
            backMsg: "新增用户失败！"
          });
        }
      } else {
        this.fail({
          backMsg: "验证码不正确"
        });
      }

    } else {
      this.fail({
        backMsg: "手机号已注册!"
      });
    }
  }

  async update() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const result = await ctx.service.user.update(params);
    console.log(result)
    if (result) {
      this.success({
        backMsg: "人员信息修改成功",
      });
    } else {
      this.fail({
        backMsg: "人员信息修改失败！"
      });
    }
  }

  async delete() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    console.log('params ===', params);

    const result = await ctx.service.user.delete(params);
    console.log('result ===', result)
    if (result) {
      this.success({
        backMsg: "用户删除成功",
      });
    } else {
      this.fail({
        backMsg: "用户删除失败！"
      });
    }
  }

  async frozen() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const isFrozen = params.isFrozen;
    const result = await ctx.service.user.frozen(params);
    if (result) {
      this.success({
        backMsg: isFrozen ? "用户冻结成功！" : "用户解冻成功！",
        backData: result
      });
    } else {
      this.fail({
        backMsg: isFrozen ? "用户冻结成失败！" : "用户解冻失败！"
      });
    }
  }

  async changePassword() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const param = {
      id: params.id,
      password: params.oldPassword
    }
    const user = await ctx.service.user.queryOneUser(param);

    if (user) {
      const newParam = {
        id: params.id,
        password: params.password
      };
      const result = await ctx.service.user.changePassword(newParam);
      if (result) {
        this.success({
          backMsg: "密码修改成功"
        });
      } else {
        this.fail({
          backMsg: "重置修改失败！"
        });
      }

    } else {
      this.fail({
        backMsg: "旧密码不正确！"
      });
    }
  }

  async retrievePassword() {
    const ctx = this.ctx;
    const params = ctx.request.body;

    const result = await ctx.service.user.retrievePassword(params)
    if (result) {
      this.success({
        backMsg: "密码找回成功"
      });
    } else {
      this.fail({
        backMsg: "密码找回失败！"
      });
    }
  }

  async getCode() {
    const ctx = this.ctx;
    const params = ctx.query;
    console.log('params ===', params);

    const result = await ctx.service.user.getCode(params)
    if (result) {
      this.success({
        backMsg: "验证码获取成功",
        backData: result
      });
    } else {
      this.fail({
        backMsg: "验证码获取失败！"
      });
    }
  }

  async checkCode() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const { telephone, code, password } = params;

    const uniqueUser = await ctx.service.user.findByPhone({ telephone })
    // 是否注册
    if (uniqueUser) {
      // 验证码校验
      const check = await ctx.service.user.checkCode({
        telephone,
        code
      });

      if (check) {
        this.success({
          backMsg: "验证通过！",
          backData: check
        });
      } else {
        this.fail({
          backMsg: "验证失败!"
        });
      }

    } else {
      this.fail({
        backMsg: "手机号未注册!"
      });
    }
  }

  async querySumList() {
    const ctx = this.ctx;
    const params = ctx.query;
    params.pageNumber = parseInt(params.pageNumber);
    params.pageSize = parseInt(params.pageSize);
    params.time = parseInt(params.time);
    params.condition = parseInt(params.condition);

    const sumList = await ctx.service.user.querySumList(params);
    this.success({
      backMsg: "获取统计列表成功！",
      backData: sumList
    });
  }

  async querySumOne() {
    const ctx = this.ctx;
    const params = ctx.query;
    params.time = parseInt(params.time);
    params.condition = parseInt(params.condition);


    const { id = '', time = 0, condition = 0 } = params;

    const user = await ctx.service.user.queryOneUser({ id });

    let order = {},
      like = {};

    if (time === 0) {
      order = await ctx.service.order.queryOrderMonthSum({ id });
      like = await ctx.service.like.queryLikeMonthSum({ id });
    }

    if (time === 1) {
      order = await ctx.service.order.queryOrderQuarterSum({ id });
      like = await ctx.service.like.queryLikeMonthSum({ id });
    }

    if (time === 2) {
      order = await ctx.service.order.queryOrderYearSum({ id });
      like = await ctx.service.like.queryLikeMonthSum({ id });
    }

    const insuranceCompany = user.InsuranceCompany;

    this.success({
      backMsg: "获取统计信息成功！",
      backData: {
        id: user.id,
        realname: user.realname,
        companyName: insuranceCompany.companyName,
        order,
        like
      }
    });
  }
}

module.exports = UserController;