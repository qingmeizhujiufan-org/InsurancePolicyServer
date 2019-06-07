'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE} = app.Sequelize;
    const File = app.model.define('File', {
        /* 附件ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1
        },
        /* 附件名称 */
        fileName: {
            type: STRING(255),
            field: 'file_name'
        },
        /* 文件类型 */
        fileType: {
            type: STRING(255),
            field: 'file_type'
        },
        /* MIME类型 */
        mimeType: {
            type: STRING(255),
            field: 'mime_type'
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
        tableName: 'file_info',
        timestamps: true,
    });
    return File;
};
