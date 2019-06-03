'use strict';

const includes = require('lodash/includes');
const BaseController = require('../core/BaseController');
const uuidv1 = require('uuid/v1');

class RoomController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.room.queryList(params);
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
        const result = await ctx.service.room.queryAdminList(params);
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
        const result = await ctx.service.room.queryMobileList(params);
        const roomList = await ctx.service.room.queryOrderListByTime(params);
        const roomids = roomList.map(item => {
            return item.roomId;
        });
        console.log(roomids);
        const newRes = result.map((item, index) =>{
            item.roomStatus = includes(roomids, item.id) ? 1 : 0;
            return item;
        })
        if (newRes) {
            this.success({
                backData: newRes,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.room.queryDetail(params);

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
        fieldsValue.state = 0;
        fieldsValue.roomRemian = fieldsValue.roomNumber;
        const result = await ctx.service.room.add(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "新增民宿房间成功！"
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
        const result = await ctx.service.room.update(fieldsValue);
     
        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "修改民宿房间信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改民宿房间信息失败！"
            });
        }
    }

    async updateStatus() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.room.updateStatus(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "修改民宿房间状态成功！"
            });
        } else {
            this.fail({
                backMsg: "修改民宿房间状态失败！"
            });
        }
    }


    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.room.delete(params);

        if (result) {
            this.success({
                backMsg: "删除民宿房间信息成功！"
            });
        } else {
            this.fail({
                backMsg: "删除失败！"
            });
        }
    }

    /* 获取最新三条民宿房间信息 */
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
        const result = await ctx.service.room.reserve(fieldsValue);

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
        const result = await ctx.service.room.queryCommentList(params);
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

    /* 获取最新三条房间信息 */
    async queryListTop3() {
        const ctx = this.ctx;
        const result = await ctx.service.room.queryListTop3();
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
        const result = ctx.model.HotelRoom.update({
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

module.exports = RoomController;
