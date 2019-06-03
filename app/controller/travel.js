'use strict';

const BaseController = require('../core/BaseController');
const uuidv1 = require('uuid/v1');

class TravelController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.travel.queryList(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryAdminList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.travel.queryList(params);
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
        const result = await ctx.service.travel.queryDetail(params);

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
        fieldsValue.id = uuidv1();
        fieldsValue.checkStatus = 0;

        const result = await ctx.service.travel.add(fieldsValue);
        const travelDay = fieldsValue.travelDay;
        travelDay.map(item => {
            item.travelId = fieldsValue.id;
        });
        const result_travel_day = await ctx.service.travel.addTravelDay(travelDay);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "新增主题旅游成功！"
            });
        } else {
            this.fail({
                backMsg: "新增失败！"
            });
        }
    }

    async check() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.travel.check(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "主题旅游信息审核成功！"
            });
        } else {
            this.fail({
                backMsg: "主题旅游信息审核失败！"
            });
        }
    }

    async update() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        fieldsValue.checkStatus = 0;
        const travelDay = fieldsValue.travelDay;
        const result = await ctx.service.travel.update(fieldsValue);
        const result_travel_day = await ctx.service.travel.updateTravelDay(travelDay);

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            this.success({
                backData: result,
                backMsg: "修改主题旅游信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改主题旅游信息失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.travel.delete(params);
        const result_travel_day = await  ctx.service.travel.deleteTravelDay(params);

        if (result) {
            this.success({
                backMsg: "删除主题旅游信息成功！"
            });
        } else {
            this.fail({
                backMsg: "删除失败！"
            });
        }
    }

    /* 报名自驾游 */
    async signTravel() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        fieldsValue.id = uuidv1();
        fieldsValue.state = 0;
        const result = await ctx.service.travel.signTravel(fieldsValue);
        const participants = fieldsValue.participants;
        participants.map(item => {
            item.travelSignId = fieldsValue.id;
        });
        const result_travel_sign_participants = await ctx.service.travel.addParticipants(participants);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "报名成功！"
            });
        } else {
            this.fail({
                backMsg: "报名失败！"
            });
        }
    }

    /* 查询报名订单 */
    async queryOrderList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.travel.queryOrderList(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    /* 查询订单详情 */
    async queryOrderDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.travel.queryOrderDetail(params);
        // const headerPicList = await ctx.service.attachment.queryListByIds(result.Travel.headerPic);
        // result.Travel.headerPic = headerPicList;
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    /* 获取最新三条主题旅游信息 */
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

    /* 推荐 */
    async recommend() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = ctx.model.Travel.update({
            isRecommend: fieldsValue.isRecommend
        }, {where: {id: fieldsValue.id}});
        if(result) {
            this.success({
                backData: result,
                backMsg: "更新成功！"
            })
        }else {
            this.fail({backMsg: "更新失败！"});
        }
    }
}

module.exports = TravelController;
