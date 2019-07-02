'use strict';

const Moment = require('moment');

module.exports = app => {

  const { UUIDV1, INTEGER, STRING, DATE } = app.Sequelize;
  const Like = app.model.define('Like', {
    //点赞记录id
    id: {
      type: STRING(255),
      defaultValue: UUIDV1,
      primaryKey: true,
      field: 'id'
    },
   
    //点赞人id
    likeFrom: {
      type: STRING(255),
      field: 'like_from' 
    },
    //被点赞人id
    likeTo: {
      type: STRING(255),
      field: 'like_to'
    },
    //点赞状态
    status: {
      type: INTEGER,
      field: 'like_status'
    },
    created_at: {
      type: DATE,
      get() {
        return Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    updated_at: {
      type: DATE,
      get() {
        return Moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    freezeTableName: true,
    tableName: 'like_info',
    timestamps: true,
  });
  return Like;
};