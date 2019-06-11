'use strict';

const BaseController = require('../core/BaseController');

class AppController extends BaseController {
  /* 登录 */
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
        backMsg: "用户编码或密码不正确！"
      });
    }
  }

  // 获取手机验证码

  // 注册
  async register() {
    const ctx = this.ctx;
    const params = ctx.request.body;

    const uniqueUser = await ctx.service.user.findByPhone({ telephone: params.telephone });

    if (uniqueUser === null) {
      const result = await ctx.service.user.add(params);

      if (result) {
        this.success({
          backMsg: '用户注册成功！',
          backData: result,
        });
      } else {
        this.fail({
          backMsg: '用户注册失败！',
        });
      }
    } else {
      this.fail({
        backMsg: '手机号已注册!',
      });
    }
  }

  // 找回密码
  async retrieve() {
    const ctx = this.ctx;
    const params = ctx.request.body;

    // 验证码校验
    const check = await ctx.service.checkCode(params);
    if (check) {
      const result = ctx.service.resetPassword(params);
      if (result) {
        this.success({
          backMsg: '密码重置成功！',
          backData: result,
        });
      } else {
        this.fail({
          backMsg: '密码重置失败！',
        });
      }
    } else {
      this.fail({
        backMsg: '验证码不正确!',
      });
    }

  }

  // 修改密码
  async changePSD() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const {
      id,
      password,
      newPassword
    } = params;
    const user = await ctx.service.user.checkOldPassword({ id, password});
    if (user) {
      const result = ctx.service.changePassword({ id, newPassword});
      if (result) {
        this.success({
          backMsg: '密码修改成功！',
          backData: result,
        });
      } else {
        this.fail({
          backMsg: '密码修改失败！',
        });
      }
    } else {
      this.fail({
        backMsg: '旧密码不正确!',
      });
    }
  }
}

module.exports = AppController;