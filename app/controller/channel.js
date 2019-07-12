'use strict';

const BaseController = require('../core/BaseController');
const {parseInt} = require('../extend/helper');

class ChannelController extends BaseController {

    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = parseInt(params.pageNumber);
        params.pageSize = parseInt(params.pageSize);
        const channel = await ctx.service.channel.queryList(params);
        this.success({
            backMsg: "获取渠道列表成功！",
            backData: channel
        });
    }

    async queryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        console.log('params ===', params);

        const result = await ctx.service.channel.queryDetail(params);

        if (result) {
            // const picList = await ctx.service.file.queryListByIds(result.avatarSrc);
            // result.avatarSrc = picList;
            this.success({
                backMsg: "渠道详情查询成功！",
                backData: result
            });
        } else {
            this.fail({
                backMsg: "详情查询失败！",
            });
        }
    }

    async add() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const uniquechannelName = await ctx.service.channel.findByName({channelName: params.channelName});

        if (uniquechannelName === null) {
            const result = await ctx.service.channel.add(params);
            console.log('result === ', result);
            if (result.dataValues) {
                this.success({
                    backMsg: "新增渠道成功！",
                    backData: result
                });
            } else {
                this.fail({
                    backMsg: "新增渠道失败！"
                });
            }
        } else {
            this.fail({
                backMsg: "渠道名已存在!"
            });
        }
    }

    async update() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.channel.update(params);

        if (result) {
            this.success({
                backMsg: "信息修改成功",
            });
        } else {
            this.fail({
                backMsg: "信息修改失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        console.log('params ===', params);

        const result = await ctx.service.channel.delete(params);
        console.log('result ===', result)
        if (result) {
            this.success({
                backMsg: "删除成功",
            });
        } else {
            this.fail({
                backMsg: "删除失败！"
            });
        }
    }
}

module.exports = ChannelController;
