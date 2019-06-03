'use strict';
module.exports = app => {
    const {UUID, STRING} = app.Sequelize;
    const Role = app.model.define('Role', {
        //角色名称
        roleName: {
            type: STRING(255),
            field: 'role_name'
        },
        //角色编码
        roleId: {
            type: STRING(255),
            primaryKey: true,
            field: 'role_id'
        }
    }, {
        freezeTableName: true,
        tableName: 'role_info',
        timestamps: false,
    });
    return Role;
};