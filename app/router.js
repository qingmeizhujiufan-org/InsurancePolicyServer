'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller, io} = app;
    const UserInterceptor = app.middleware.userInterceptor({}, app);
    router.get('/api', controller.home.index);

    /* 后台管理登录 */
    router.post('/api/admin/login', controller.admin.login);
    /* 获取用户列表 */
    router.get('/api/admin/queryList', UserInterceptor, controller.admin.queryList);
    /* 获取用户详情 */
    router.get('/api/admin/qureyOneUser', UserInterceptor, controller.admin.qureyOneUser);
    /* 后台新增管理人员 */
    router.post('/api/admin/add', UserInterceptor, controller.admin.add);
    /* 后台修改管理人员 */
    router.post('/api/admin/updateUser', UserInterceptor, controller.admin.updateUser);
    /* 后台删除用户 */
    router.post('/api/admin/delete', UserInterceptor, controller.admin.delete);
    /* 后台用户冻结 */
    router.post('/api/admin/frozen', UserInterceptor, controller.admin.frozen);
    /* 后台重置密码 */
    router.post('/api/admin/resetPassword', UserInterceptor, controller.admin.resetPassword);

    /* 查询业务员列表 */
    router.get('/api/user/queryList', controller.user.queryList);

    /* 附件上传 */
    router.post('/api/file/upload', controller.file.upload);
    /* 根据id查找附件 */
    router.get('/api/file/queryListByIds', controller.file.queryListByIds);

    /*
     * APP接口
     */
    /* 微信登录 */
    router.get('/api/app/login', controller.app.login);
};
