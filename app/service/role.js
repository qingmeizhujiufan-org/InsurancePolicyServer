'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class RoleService extends Service {

  async queryList() {
    // 角色列表
    const Role = await this.ctx.model.Role.findAll()
    return Role;
  }

  // 增加角色
  async add(params) {
    const data = {
      id: UUID.v1(),
      real_name: params.realName,
      user_name: params.userName,
      user_pwd: params.password,
      role_id: params.roleId,
      create_time: this.app.mysql.literals.now,
      is_frozen: 0
    };

    const result = await this.app.mysql.insert('role_info', data);
    return result;
  }

}

module.exports = RoleService;