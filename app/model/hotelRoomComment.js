'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const HotelRoomComment = app.model.define('HotelRoomComment', {
        /* 评论ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
        /* room ID */
        roomId: {
            type: STRING(255),
            field: 'room_id'
        },
        /* 用户 ID */
        userId: {
            type: STRING(255),
            field: 'user_id'
        },
        /* 回复 ID */
        pid: {
            type: STRING(255),
            field: 'pid'
        },
        /* 点评内容 */
        commentContent: {
            type: STRING(500),
            field: 'comment_content'
        },
        /* 点评星级 */
        commentStar: {
            type: INTEGER,
            field: 'comment_star'
        },
        /* 图片 */
        detailPic: {
            type: STRING(500),
            field: 'detail_pic'
        },
        created_at: {
            type: DATE,
            get() {
                return this.getDataValue('created_at') && Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updated_at: {
            type: DATE,
            get() {
                return this.getDataValue('updated_at') && Moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'hotel_room_comment_info',
        timestamps: true,
    });
    return HotelRoomComment;
};
