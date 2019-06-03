'use strict';

const BaseController = require('../core/BaseController');

class RoleController extends BaseController {
  async queryList() {
    const ctx = this.ctx;
    const roleList = await ctx.service.role.queryList();
    ctx.body = {
      success: true,
      backMsg: "获取角色列表成功！",
      backData: roleList
    };
  }

  async add() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    // console.log('params ===', params);
    const uniqueUser = await ctx.service.admin.findByName({ user_name: params.userName })

    if (uniqueUser !== null) {
      const result = await ctx.service.admin.add(params);
      if (result.affectedRows === 1) {
        ctx.body = {
          success: true,
          backMsg: "新增角色成功！",
          backData: result
        };
      } else {
        ctx.body = {
          success: false,
          backMsg: "新增角色失败！"
        };
      }
    } else {
      ctx.body = {
        success: false,
        backMsg: "当前角色已存在!"
      };
    }
  }
}

module.exports = RoleController;