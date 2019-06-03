'use strict';

const Service = require('egg').Service;

class AuthService extends Service {
    async login(params) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const user = await this.app.mysql.get('admin_info', params);
        return user;
    }
}

module.exports = AuthService;