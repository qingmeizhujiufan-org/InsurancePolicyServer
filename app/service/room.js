'use strict';

const Service = require('egg').Service;
const Moment = require('moment');

class RoomService extends Service {

  async queryList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Room = ctx.model.HotelRoom;
    const Attachment = ctx.model.Attachment;
    Room.belongsTo(Attachment, { foreignKey: 'thumbnail' });
    const { pageNumber = 1, pageSize = 10, keyWords = '', hotelkeeperId } = params;
    const whereCondition = {
      '$or': {
        roomName: {
          '$like': '%' + keyWords + '%'
        },
      },
      '$and': {
        hotelId: hotelkeeperId
      }
    };

    const dataList = await Promise.all([
      Room.findAll({
        where: whereCondition,
      }),
      Room.findAll({
        where: whereCondition,
        attributes: [
          'id',
          'detailPic',
          'hotelId',
          'roomName',
          'roomPrice',
          'roomStatus',
          'bedModel',
          'roomSize',
          'stayPersonNum',
          'internet',
          'windowScenery',
          'window',
          'bathroom',
          'breakfast',
          'drink',
          'facilities',
          'payType',
          'canCancel',
          'canAddbed',
          'innerNeed',
          'sale',
          'state',
          'updateBy',
          'createBy',
          'updated_at',
          'created_at'
        ],
        include: [{
          model: Attachment,
          attributes: ['id', 'fileType']
        }],
        order: [
          ['created_at', 'DESC']
        ],
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      })
    ]);

    return {
      content: dataList[1],
      pageNumber,
      pageSize,
      totalElements: dataList[0].length,
      totalPages: Math.ceil(dataList[0].length / pageSize)
    };
  }

  async queryAdminList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Room = ctx.model.HotelRoom;
    const Attachment = ctx.model.Attachment;
    Room.belongsTo(Attachment, { foreignKey: 'thumbnail' });
    const { pageNumber = 1, pageSize = 10, keyWords = '', state } = params;
    const whereCondition = {
      '$or': {
        roomName: {
          '$like': '%' + keyWords + '%'
        },
      }
    };
    if (state !== undefined && state !== null) whereCondition['$and'] = { state };

    const dataList = await Promise.all([
      Room.findAll({
        where: whereCondition,
      }),
      Room.findAll({
        where: whereCondition,
        attributes: [
          'id',
          'detailPic',
          'hotelId',
          'roomName',
          'roomPrice',
          'roomStatus',
          'bedModel',
          'roomSize',
          'stayPersonNum',
          'internet',
          'windowScenery',
          'window',
          'bathroom',
          'breakfast',
          'drink',
          'facilities',
          'payType',
          'canCancel',
          'canAddbed',
          'innerNeed',
          'sale',
          'isRecommend',
          'state',
          'updateBy',
          'createBy',
          'updated_at',
          'created_at'
        ],
        include: [{
          model: Attachment,
          attributes: ['id', 'fileType']
        }],
        order: [
          ['created_at', 'DESC']
        ],
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      })
    ]);

    return {
      content: dataList[1],
      pageNumber,
      pageSize,
      totalElements: dataList[0].length,
      totalPages: Math.ceil(dataList[0].length / pageSize)
    };
  }

  async queryMobileList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Room = ctx.model.HotelRoom;
    const Attachment = ctx.model.Attachment;
    Room.belongsTo(Attachment, { foreignKey: 'thumbnail' });
    const { hotelId } = params;

    const dataList = await Room.findAll({
      where: {
        hotelId,
        state: 2,
        roomStatus: 0
      },
      attributes: [
        'id',
        'detailPic',
        'hotelId',
        'roomName',
        'roomPrice',
        'roomStatus',
        'bedModel',
        'roomSize',
        'stayPersonNum',
        'internet',
        'windowScenery',
        'window',
        'bathroom',
        'breakfast',
        'drink',
        'facilities',
        'payType',
        'canCancel',
        'canAddbed',
        'innerNeed',
        'sale',
        'state',
        'updateBy',
        'createBy',
        'updated_at',
        'created_at'
      ],
      include: [{
        model: Attachment,
        attributes: ['id', 'fileType']
      }],
      order: [
        ['created_at', 'DESC']
      ]
    });

    return dataList;
  }

  /* 查询特定时间报名订单 */
  async queryOrderListByTime(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Op = Sequelize.Op;
    const HotelRoomReserve = ctx.model.HotelRoomReserve;
    const { hotelId, beginDate, endDate } = params;
    const whereCondition = {
      '$and': {
        beginDate: {
          [Op.gte]: Moment(beginDate).startOf('day')
        },
        endDate: {
          [Op.lte]: Moment(endDate).endOf('day')
        },
        hotelId,
        status: {
          [Op.notIn]: [3, 4]
        }
      }
    };


    const roomIdList = HotelRoomReserve.findAll({
      where: whereCondition,
      attributes: ['roomId']
    });
    return roomIdList
  }


  async queryListTop3() {
    const ctx = this.ctx;
    const HotelRoom = ctx.model.HotelRoom;
    const Attachment = ctx.model.Attachment;
    HotelRoom.belongsTo(Attachment, { foreignKey: 'thumbnail' });

    const dataList = await HotelRoom.findAll({
      where: {
        '$and': {
          state: 2,
          isRecommend: 1
        }
      },
      attributes: [
        'id',
        'detailPic',
        'hotelId',
        'roomName',
        'roomPrice',
        'roomStatus',
        'bedModel',
        'roomSize',
        'stayPersonNum',
        'internet',
        'windowScenery',
        'window',
        'bathroom',
        'breakfast',
        'drink',
        'facilities',
        'payType',
        'canCancel',
        'canAddbed',
        'innerNeed',
        'sale',
        'state',
        'updateBy',
        'createBy',
        'updated_at',
        'created_at'
      ],
      include: [{
        model: Attachment,
        attributes: ['id', 'fileType']
      }],
      order: [
        ['created_at', 'DESC']
      ],
      limit: 3
    });

    return {
      content: dataList,
    };
  }

  async queryDetail(params) {
    const ctx = this.ctx;
    const Room = ctx.model.HotelRoom;
    const { id } = params;
    const res = await ctx.model.HotelRoom.findOne({
      where: {
        id
      }
    });

    return res;
  }

  async add(fieldsValue) {
    const ctx = this.ctx;
    const row = {
      ...fieldsValue
    };
    const res = await ctx.model.HotelRoom.create(row);

    return {
      rowsAffected: res,
    };
  }

  async update(fieldsValue) {
    const ctx = this.ctx;
    const { id, ...restFieldsValue } = fieldsValue;
    const res = await ctx.model.HotelRoom.update(restFieldsValue, {
      where: { id }
    });

    return { rowsAffected: res };
  }

  async updateStatus(fieldsValue) {
    const ctx = this.ctx;
    const { id, ...restFieldsValue } = fieldsValue;
    const res = await ctx.model.HotelRoom.update(restFieldsValue, {
      where: { id }
    });

    return { rowsAffected: res };
  }

  async delete(params) {
    const res = await this.ctx.model.HotelRoom.destroy({
      where: { id: params.id }
    });
    return res;
  }

  async addRoomDay(fieldsValueList) {
    const ctx = this.ctx;
    const res = await ctx.model.RoomDay.bulkCreate(fieldsValueList);

    return {
      rowsAffected: res,
    };
  }

  async updateRoomDay(fieldsValueList) {
    const ctx = this.ctx;
    let updateList = [];
    for (let i = 0; i < fieldsValueList.length; i++) {
      let item = fieldsValueList[i];
      updateList.push(
        ctx.model.RoomDay.update(item, {
          where: { id: item.id }
        })
      );
    }
    const res = await Promise.all(updateList);

    return { rowsAffected: res };
  }

  async deleteRoomDay(params) {
    const res = await this.ctx.model.RoomDay.destroy({
      where: { RoomId: params.id }
    });
    return res;
  }

  /* 预订 */
  async reserve(fieldsValue) {
    const ctx = this.ctx;
    fieldsValue.orderId = `${new Date().getTime()}${fieldsValue.userId.substr(-4)}`;
    const row = {
      ...fieldsValue,
      status: 0
    };

    const res = await ctx.model.HotelRoomReserve.create(row);

    return {
      rowsAffected: res,
    };
  }

  /* 查询订单列表 */
  async queryOrderList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const HotelRoomReserve = ctx.model.HotelRoomReserve;
    const { roomId } = params;

    const dataList = await HotelRoomReserve({
      where: {
        roomId
      },
      attributes: [
        'id',
        'roomId',
        'userId',
        'pid',
        'hotelName',
        'roomName',
        'roomType',
        'detailPic',
        'updated_at',
        'created_at'
      ],
      order: [
        ['created_at', 'DESC']
      ]
    });

    return dataList;
  }

  /* 查询评论列表 */
  async queryCommentList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const HotelRoomComment = ctx.model.HotelRoomComment;
    const User = ctx.model.User;
    const Room = ctx.model.HotelRoom;
    HotelRoomComment.belongsTo(User, { foreignKey: 'userId' });
    HotelRoomComment.belongsTo(Room, { foreignKey: 'roomId' });
    const { roomId } = params;

    const dataList = await HotelRoomComment.findAll({
      where: {
        roomId
      },
      attributes: [
        'id',
        'roomId',
        'userId',
        'pid',
        'commentContent',
        'commentStar',
        'detailPic',
        'updated_at',
        'created_at'
      ],
      include: [{
        model: User
      }, {
        model: Room
      }],
      order: [
        ['created_at', 'DESC']
      ]
    });

    return dataList;
  }
}

module.exports = RoomService;