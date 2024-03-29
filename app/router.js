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
    router.get('/api/admin/queryOneUser', controller.admin.queryOneUser);
    /* 后台新增管理人员 */
    router.post('/api/admin/add', UserInterceptor, controller.admin.add);
    /* 后台修改管理人员 */
    router.post('/api/admin/update', controller.admin.update);
    /* 后台删除用户 */
    router.post('/api/admin/delete', UserInterceptor, controller.admin.delete);
    /* 后台用户冻结 */
    router.post('/api/admin/frozen', UserInterceptor, controller.admin.frozen);
    /* 后台重置密码 */
    router.post('/api/admin/resetPassword', UserInterceptor, controller.admin.resetPassword);

    /* 附件上传 */
    router.post('/api/file/upload', controller.file.upload);
    /* 根据id查找附件 */
    router.get('/api/file/queryListByIds', controller.file.queryListByIds);

    /*添加客户*/
    router.post('/api/custom/add', controller.custom.add);
    /*客户列表*/
    router.get('/api/custom/queryList', controller.custom.queryList);
    /*客户详情*/
    router.get('/api/custom/queryOne', controller.custom.queryOne);
    /*客户更新*/
    router.post('/api/custom/update', controller.custom.update);
    /*客户删除*/
    router.post('/api/custom/delete', controller.custom.delete);

    /*添加订单*/
    router.post('/api/order/add', controller.order.add);
    /*订单列表*/
    router.get('/api/order/queryList', controller.order.queryList);
    /*订单详情*/
    router.get('/api/order/queryOne', controller.order.queryOne);
    /*订单更新*/
    router.post('/api/order/update', controller.order.update);
    /*订单删除*/
    router.post('/api/order/delete', controller.order.delete);

    /* 业务员登录 */
    router.post('/api/user/login', controller.user.login);
    /* 业务员注册 */
    router.post('/api/user/add', controller.user.add);
    /* 查询业务员列表 */
    router.get('/api/user/queryList', controller.user.queryList);
    /* 业务员获取验证码 */
    router.get('/api/user/getCode', controller.user.getCode);
    /* 业务员验证码校验 */
    router.post('/api/user/checkCode', controller.user.checkCode);
    /*业务员业务统计详情*/
    router.get('/api/user/queryUserSum', controller.user.queryUserSum);
    /*业务员信息详情查询*/
    router.get('/api/user/queryOneUser', controller.user.queryOneUser);
    /*业务员信息详情保存*/
    router.post('/api/user/update', controller.user.update);
    /*业务员修改密码*/
    router.post('/api/user/changePassword', controller.user.changePassword);
    /*业务员重置密码*/
    router.post('/api/user/retrievePassword', controller.user.retrievePassword);
    /*业务员业务统计*/
    router.get('/api/user/querySumList', controller.user.querySumList);
    /*业务员个人业务统计*/
    router.get('/api/user/querySumOne', controller.user.querySumOne);
    /*业务员点赞*/
    router.post('/api/user/like', controller.user.like);
    router.post('/api/user/unlike', controller.user.unlike);


    /* 查询保险公司列表 */
    router.get('/api/insuranceCompany/queryList', controller.insuranceCompany.queryList);
    /* 查询保险公司详情 */
    router.get('/api/insuranceCompany/queryDetail', controller.insuranceCompany.queryDetail);
    /* 新增保险公司 */
    router.post('/api/insuranceCompany/add', controller.insuranceCompany.add);
    /* 更新保险公司 */
    router.post('/api/insuranceCompany/update', controller.insuranceCompany.update);
    /* 删除保险公司 */
    router.post('/api/insuranceCompany/delete', controller.insuranceCompany.delete);

    /* 查询渠道列表 */
    router.get('/api/channel/queryList', controller.channel.queryList);
    /* 查询渠道详情 */
    router.get('/api/channel/queryDetail', controller.channel.queryDetail);
    /* 新增渠道 */
    router.post('/api/channel/add', controller.channel.add);
    /* 更新渠道 */
    router.post('/api/channel/update', controller.channel.update);
    /* 删除渠道 */
    router.post('/api/channel/delete', controller.channel.delete);

    /* 链接查询 */
    router.get('/api/link/queryDetail', controller.link.queryDetail);
    /* 链接更新 */
    router.post('/api/link/update', controller.link.update);

    /*
     * APP接口
     */
    /* 微信登录 */
    router.get('/api/app/login', controller.app.login);
    /* 微信注册 */
    router.get('/api/app/register', controller.app.register);

};
