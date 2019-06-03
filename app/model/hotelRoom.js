'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE, TEXT} = app.Sequelize;
    const Room = app.model.define('Room', {
        /* 民宿ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
        thumbnail: {
            type: STRING(255),
            field: 'thumbnail'
        },
        /* 民宿房间详情图 */
        detailPic: {
            type: STRING(255),
            field: 'detail_pic'
        },
        /* 民宿id */
        hotelId: {
            type: STRING(255),
            field: 'hotel_id'
        },
         /* 房间名称 */
        roomName: {
            type: STRING(255),
            field: 'room_name'
        },
          /* 房间价格 */
        roomPrice: {
            type: DECIMAL,
            field: 'room_price'
        },
         /* 房间状态 */
        roomStatus: {
            type: INTEGER,
            field: 'room_status'
        },
        /* 床型 */
        bedModel: {
            type: DECIMAL,
            field: 'bed_model'
        },
        /* 房间大小 */
        roomSize: {
            type: STRING(255),
            field: 'room_size'
        },
        /* 可入住人数 */
        stayPersonNum: {
            type: INTEGER,
            field: 'stay_person_num'
        },
        /* 网络 */
        internet: {
            type: STRING(255),
            field: 'internet'
        },
        /* 窗景 */
        windowScenery: {
            type: STRING(255),
            field: 'window_scenery'
        },
        /* 窗户 */
        window: {
            type: STRING(255),
            field: 'window'
        },
        /* 卫浴 */
        bathroom: {
            type: STRING(255),
            field: 'bathroom'
        },
        /* 早餐 */
        breakfast: {
            type: STRING(255),
            field: 'breakfast'
        },
        /* 饮品 */
        drink: {
            type: STRING(255),
            field: 'drink'
        },
        /* 设施 */
        facilities: {
            type: TEXT,
            field: 'facilities'
        },
        /* 支付类型 */
        payType: {
            type: TEXT,
            field: 'pay_type'
        },
        /* 是否可以取消 */
        canCancel: {
            type: STRING(32),
            field: 'can_cancel'
        },
        /* 是否可以加床 */
        canAddbed: {
            type: STRING(32),
            field: 'can_addbed'
        },
        /* 内宾 */
        innerNeed: {
            type: STRING(255),
            field: 'inner_need'
        },
        /* 优惠政策 */
        sale: {
            type: STRING(255),
            field: 'sale'
        },
        /* 审核状态 */
        state: {
            type: INTEGER,
            field: 'state'
        },
        /* 是否推荐 */
        isRecommend: {
            type: INTEGER,
            field: 'is_recommend'
        },
        /* 修改人 */
        updateBy: {
            type: STRING(255),
            field: 'update_by'
        },
        /* 创建人 */
        createBy: {
            type: STRING(255),
            field: 'create_by'
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
        tableName: 'hotel_room_info',
        timestamps: true,
    });
    return Room;
};
