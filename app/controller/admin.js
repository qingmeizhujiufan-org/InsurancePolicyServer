'use strict';

const jwt = require('jsonwebtoken');
const BaseController = require('../core/BaseController');

function generateToken(data, time) {
    let created = Math.floor(Date.now());
    // let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));//私钥
    let token = jwt.sign({
        data,
        exp: created + time
    }, 'shhhhh');
    return token;
}

class AdminController extends BaseController {

    async login() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const user = await ctx.service.admin.login(params);
        if (user) {
            //生成cookie
            let token = generateToken({_id: user.id}, 3 * 60 * 60 * 1000);
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

    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = parseInt(params.pageNumber);
        params.pageSize = parseInt(params.pageSize);
        const adminList = await ctx.service.admin.queryList(params);
        this.success({
            backMsg: "获取用户列表成功！",
            backData: adminList
        });
    }

    async qureyOneUser() {
        const ctx = this.ctx;
        const params = ctx.query;
        console.log('params ===', params);

        const result = await ctx.service.admin.qureyOneUser(params);

        if (result) {
            const picList = await ctx.service.attachment.queryListByIds(result.avatarSrc);
            result.avatarSrc = picList;
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

    async add() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        // console.log('params ===', params);

        const uniqueUser = await ctx.service.admin.findByName({userName: params.userName})

        if (uniqueUser === null) {
            const result = await ctx.service.admin.add(params);

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
                backMsg: "用户名已存在!"
            });
        }
    }

    async updateUser() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.admin.updateUser(params);
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

        const result = await ctx.service.admin.delete(params);
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
        const result = await ctx.service.admin.frozen(params);
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

    async resetPassword() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const result = await ctx.service.admin.resetPassword(params)
        if (result) {
            this.success({
                backMsg: "重置密码成功，新密码为000000",
                backData: result
            });
        } else {
            this.fail({
                backMsg: "重置密码失败！"
            });
        }
    }
}

module.exports = AdminController;
