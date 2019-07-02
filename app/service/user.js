'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');
const Moment = require('moment');
const { getYearRange, getMonthRange, getQuarterRange } = require('../extend/util');

class UserService extends Service {

  async login(params) {
    const ctx = this.ctx;
    const User = ctx.model.User;
    const File = ctx.model.File;
    User.belongsTo(File, { foreignKey: 'headimgurl' });
    const res = await ctx.model.User.findOne({
      where: params,
      include: [{
        model: File,
        attributes: ['id', 'fileType']
      }],
    });
    return res;
  }

  async queryList(params) {
    const ctx = this.ctx;
    const User = ctx.model.User;
    const { pageNumber = 1, pageSize = 10, keyWords = '' } = params;
    const whereCondition = {
      '$and': {
        telephone: {
          '$like': '%' + keyWords + '%'
        },
        realname: {
          '$like': '%' + keyWords + '%'
        }
      }
    };

    const dataList = await Promise.all([
      User.findAll({
        where: whereCondition,
      }),
      User.findAll({
        where: whereCondition,
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
      totalElements: dataList[0].length
    };
  }

  async add(params) {
    const res = await this.ctx.model.User.create(params);
    return res;
  }

  async update(params) {
    const res = await this.ctx.model.User.update(params, {
      where: { id: params.id }
    });
    return res;
  }

  async queryOneUser(params) {
    const res = await this.ctx.model.User.findOne({
      where: {
        ...params
      }
    });
    return res;
  }


  async delete(params) {
    const res = await this.ctx.model.User.destroy({
      where: { id: params.id }
    });
    return res;
  }

  async findByName(params) {
    const user = await this.ctx.model.User.findOne({
      where: params
    });
    return user;
  }

  async findByPhone(params) {
    const user = await this.ctx.model.User.findOne({
      where: params
    });
    return user;
  }

  async changePassword(params) {
    const { id, password } = params;
    const user = await this.ctx.model.User.update({ password }, {
      where: { id }
    });
    return user;
  }

  async retrievePassword(params) {
    const { telephone, password } = params;
    const user = await this.ctx.model.User.update({ password }, {
      where: { telephone }
    });
    return user;
  }

  async checkCode(params) {
    return true
  }

  async resetPassword(params) {
    const newData = {
      ...params,
      password: '000000',
    }
    const res = await this.ctx.model.User.update(newData, {
      where: { id: params.id }
    });
    return res;
  }

  async frozen(params) {
    const newData = {
      ...params
    }
    const res = await this.ctx.model.User.update(newData, {
      where: { id: params.id }
    });
    return res;
  }

  async getCode(params) {
    // const res = await this.ctx.model.User.update(newData, {
    //   where: { id: params.id }
    // });
    return {
      code: '000000'
    };
  }

  async querySumList(params) {
    const Sequelize = this.app.Sequelize;
    const Op = Sequelize.Op;
    const ctx = this.ctx;
    const User = ctx.model.User;
    const Order = ctx.model.Order;
    const Like = ctx.model.Like;
    Order.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    Like.belongsTo(User, { foreignKey: 'likeTo', targetKey: 'id' });

    const { pageNumber = 1, pageSize = 10, time = 0, condition = 0 } = params;
    const whereCondition = {};
    let range = {};
    let order = '';

    if (time === 0) {
      range = getMonthRange();
    }

    if (time === 1) {
      range = getQuarterRange();
    }

    if (time === 2) {
      range = getYearRange();
    }

    if (condition === 0) {
      order = 'insurance';
    }
    if (condition === 1) {
      order = 'orderNum';
    }



    const dataList = await Promise.all([
      User.findAll({
        where: whereCondition,
      }),
      User.findAll({
        where: whereCondition,
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
      totalElements: dataList[0].length
    };
  }

  async querySumOne(params) {
    const Sequelize = this.app.Sequelize;
    const Op = Sequelize.Op;
    const ctx = this.ctx;
    const User = ctx.model.User;
    const Order = ctx.model.Order;
    const Like = ctx.model.Like;
    // User.hasMany(Order, { foreignKey: 'userId', sourceKey: 'id' });
    // User.hasMany(Like, { foreignKey: 'likeTo', sourceKey: 'id' });
    // Order.belongsTo(User, { foreignKey: 'userId'});
    // Like.belongsTo(User, { foreignKey: 'likeTo'});
    // 


    const { id = '', time = 0, condition = 0 } = params;
    let range = {};

    if (time === 0) {
      range = getMonthRange();
    }

    if (time === 1) {
      range = getQuarterRange();
    }

    if (time === 2) {
      range = getYearRange();
    }

    const order = Order.findAll({
      where: {
        userId: id,
        insuredTime: {
          [Op.between]: [range.beginDate, range.endDate]
        },
      },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'orderNum'],
        [Sequelize.fn('SUM', Sequelize.col('insurance')), 'orderSum']
      ],
    });

    const like = Like.findAll({
      where: {
        likeTo: id,
        created_at: {
          [Op.between]: [range.beginDate, range.endDate]
        },
      },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('userId')), 'orderNum'],
        [Sequelize.fn('SUM', Sequelize.col('insurance')), 'orderSum']
      ],
    });

    const res = User.findOne({
      where: {
        id
      },
      attributes: ['id', 'realname', 'company'],
      // include: [{
      //   model: Order,
      //   attributes: [
          // [Sequelize.fn('COUNT', Sequelize.col('userId')), 'orderNum'],
          // [Sequelize.fn('SUM', Sequelize.col('insurance')), 'orderSum']
      //   ],
      //   where: {
      //     insuredTime: {
      //       [Op.between]: [range.beginDate, range.endDate]
      //     },
      //   }
      // }, {
      //   model: Like,
      //   attributes: [
          // [Sequelize.fn('COUNT', Sequelize.col('likeTo')), 'likeNum']
        // ],
        // where: {
        //   created_at: {
        //     [Op.between]: [range.beginDate, range.endDate]
        //   },
        // }
      // }]
    })

    return {
        res, order, like
    };
  }
}

module.exports = UserService;