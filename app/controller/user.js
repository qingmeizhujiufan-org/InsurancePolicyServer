'use strict';

const jwt = require('jsonwebtoken');
const BaseController = require('../core/BaseController');
const Core = require('@alicloud/pop-core');
const {parseInt} = require('../extend/helper');
const {getSum} = require('../extend/util');
const {find} = require('lodash');

const client = new Core({
    accessKeyId: 'LTAIZ1sfLJcJUFur',
    accessKeySecret: 'ti0Uxv8znIQPNFwrumhDNWPNLS7tft',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});

const TemplateCodeList = [{
    type: '1',
    name: '身份验证验证码',
    code: 'SMS_170380019'
}, {
    type: '2',
    name: '登录确认验证码',
    code: 'SMS_170380018'
}, {
    type: '3',
    name: '登录异常验证码',
    code: 'SMS_170380017'
}, {
    type: '4',
    name: '用户注册验证码',
    code: 'SMS_170380016'
}, {
    type: '5',
    name: '修改密码验证码',
    code: 'SMS_170380015'
}, {
    type: '6',
    name: '找回密码验证码',
    code: 'SMS_170348061'
}, {
    type: '7',
    name: '信息变更验证码',
    code: 'SMS_170380014'
}];

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
        const uniqueUser = await ctx.service.user.findByPhone({telephone: params.telephone});
        // 是否注册
        if (uniqueUser) {
            const user = await ctx.service.user.login(params);
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
                    backMsg: "手机号或密码不正确！"
                });
            }
        } else {
            this.fail({
                backMsg: "手机号未注册！"
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
            const bgImg = await ctx.service.file.queryListByIds(result.bgId);
            result.bgImg = bgImg;

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

        let user = await ctx.service.user.queryOneUser(params);
        let month = await ctx.service.order.queryOrderMonthSum(params);
        let quarter = await ctx.service.order.queryOrderQuarterSum(params);
        let year = await ctx.service.order.queryOrderYearSum(params);

        if (user) {

            const bgImg = await ctx.service.file.queryListById(user.bgId);
            user.bgId = bgImg;

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
        const {telephone, code, password} = params;

        // 验证码校验
        const check = await ctx.service.user.checkCode();

        if (check.length > 0) {

            if (check[0].telephone == telephone && check[0].code == code) {

                const uniqueUser = await ctx.service.user.findByPhone({telephone});
                // 是否注册
                if (uniqueUser === null) {
                    const tempname = "blh****" + telephone.substring(telephone.length - 4);
                    const result = await ctx.service.user.add({realname: tempname, telephone, password});

                    if (result.dataValues) {
                        this.success({
                            backMsg: "注册成功！",
                            backData: result
                        });
                    } else {
                        this.fail({
                            backMsg: "注册失败！"
                        });
                    }
                } else {
                    this.fail({
                        backMsg: "手机号已注册!"
                    });
                }

            } else {
                this.fail({
                    backMsg: "验证码错误!"
                });
            }
        } else {
            this.fail({
                backMsg: "验证超时!"
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
                    backMsg: "密码修改失败！"
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
        const {telephone, type = '4'} = params;
        console.log('params ===', params);

        const templateCode = find(TemplateCodeList, item => {
            return item.type === type
        });

        const code = Math.floor((Math.random() * 9 + 1) * 100000);
        const requestParams = {
            "PhoneNumbers": telephone,
            "SignName": "保联汇",
            "TemplateCode": templateCode.code,
            "TemplateParam": JSON.stringify({
                code: `${code}`
            })
        };
        const requestOption = {
            method: 'POST'
        };


        client.request('SendSms', requestParams, requestOption).then((result) => {
            // console.log('SendSms == ', result);
        }, (ex) => {
            // console.log('SendSms error == ', ex);
        });

        const result = await ctx.model.Code.create({
            telephone,
            code
        })

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
        const {telephone, code, password} = params;
        console.log('params===', params)

        // 验证码校验
        const check = await ctx.service.user.checkCode();
        console.log('check===', check)

        if (check.length > 0) {
            console.log(check[0])
            if (check[0].telephone === telephone && check[0].code === code) {
                this.success({
                    backMsg: "验证通过！",
                    backData: check
                });
            } else {
                this.fail({
                    backMsg: "验证码错误!"
                });
            }

        } else {
            this.fail({
                backMsg: "验证超时!"
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
        const {content = [], ...rest} = sumList;
        const result = [],
            promiseList = [];

        content.map(item => {
            const _item = item;
            result.push(_item);
            if (params.userId) {
                promiseList.push(ctx.service.thumbup.findById({
                    thumbupId: _item.id,
                    userId: params.userId
                }));
            }
        });
        const resultList = await Promise.all(promiseList);
        result.map((item, index) => {
            item.thumbup = resultList[index] && resultList[index].dataValues;
        });


        // content.map(item => {
        //   const _item = item.dataValues;
        //   result.push(_item);
        //   promiseList.push(ctx.service.Thumbup.findById({

        //   }));
        // });
        // const resultList = await Promise.all(promiseList);
        // console.log('resultList == ', resultList);
        // result.map((item, index) => {
        //   item.bgFile = resultList[index] && resultList[index].dataValues;
        // });

        this.success({
            backMsg: "获取统计列表成功！",
            backData: {
                ...rest,
                content: result
            }
        });
    }

    async querySumOne() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.time = parseInt(params.time);
        params.condition = parseInt(params.condition);
        const list = await ctx.service.user.querySumOne(params);
        let result = {}, firstUser = {};
        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === params.id) {
                    result = list[i];
                    result.index = i + 1;
                    break;
                }
            }

            firstUser = list[0];
            if (firstUser.bgId) {
                const bgFile = await ctx.service.file.queryListById(firstUser.bgId);
                firstUser.bgFile = bgFile;
            }
        }

        this.success({
            backMsg: "获取统计信息成功！",
            backData: {
                user: result,
                firstUser
            }
        });
    }

    async like() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const result = await ctx.service.user.like(params)
        if (result) {
            const likeRes = await ctx.service.user.countLike(params)
            this.success({
                backData: likeRes,
                backMsg: "点赞成功"
            });
        } else {
            this.fail({
                backMsg: "点赞失败！"
            });
        }
    }

    async unlike() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const result = await ctx.service.user.unlike(params)
        if (result) {
            const likeRes = await ctx.service.user.countLike(params)
            this.success({
                backData: likeRes,
                backMsg: "取消点赞成功"
            });
        } else {
            this.fail({
                backMsg: "取消点赞失败！"
            });
        }
    }
}

module.exports = UserController;
