'use strict';

const BaseController = require('../core/BaseController');
const uuidv1 = require('uuid/v1');

class foodKeeperController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.foodKeeper.queryList(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryKeeperList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.foodKeeper.queryKeeperList(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryMobileList() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.foodKeeper.queryMobileList(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.foodKeeper.queryDetail(params);

        if (result) {
            const headerPicList = await ctx.service.attachment.queryListByIds(result.headerPic);
            const detailPicList = await ctx.service.attachment.queryListByIds(result.detailPic);
            result.headerPic = headerPicList;
            result.detailPic = detailPicList;

            this.success({
                backData: result,
                backMsg: '查询成功！'
            });
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async add() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        fieldsValue.checkStatus = 0;
        const result = await ctx.service.foodKeeper.add(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "新增食品商家成功！"
            });
        } else {
            this.fail({
                backMsg: "新增失败！"
            });
        }
    }

    async update() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        fieldsValue.state = 0;
        const result = await ctx.service.foodKeeper.update(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "修改食品商家信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改食品商家信息失败！"
            });
        }
    }

    async check() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.foodKeeper.check(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "食品商家信息审核成功！"
            });
        } else {
            this.fail({
                backMsg: "食品商家信息审核失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.foodKeeper.delete(params);

        if (result) {
            this.success({
                backMsg: "删除食品商家信息成功！"
            });
        } else {
            this.fail({
                backMsg: "删除失败！"
            });
        }
    }

    /* 获取最新三条食品商家信息 */
    async queryListTop3() {
        const ctx = this.ctx;
        const result = await ctx.service.travel.queryListTop3();
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    /* 预订 */
    async reserve() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.foodKeeper.reserve(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "预订成功！"
            });
        } else {
            this.fail({
                backMsg: "报名失败！"
            });
        }
    }

    /* 查询评论列表 */
    async queryCommentList() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.foodKeeper.queryCommentList(params);
        if (result) {
            const promiseList = [];
            result.map(item => {
                promiseList.push(ctx.service.attachment.queryListByIds(item.detailPic));
            });
            const resultList = await Promise.all(promiseList);
            result.map((item, index) => {
                item.detailPic = resultList[index];
            });

            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

}

module.exports = foodKeeperController;
