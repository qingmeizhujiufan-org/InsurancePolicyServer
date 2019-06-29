'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
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

  /*添加客户*/
  router.post('/api/custom/add', controller.custom.add);
  /*客户列表*/
  router.get('/api/custom/queryList', controller.custom.queryList);
  /*客户详情*/
  router.get('/api/custom/queryOne', controller.custom.queryOne);
  /*客户更新*/
  router.post('/api/custom/update', controller.custom.update);

  /*添加订单*/
  router.post('/api/order/add', controller.order.add);
  /*订单列表*/
  router.get('/api/order/queryList', controller.order.queryList);
  /*订单详情*/
  router.get('/api/order/queryOne', controller.order.queryOne);
  /*订单更新*/
  router.post('/api/order/update', controller.order.update);

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
  /*
   * APP接口
   */
  /* 微信登录 */
  router.get('/api/app/login', controller.app.login);
  /* 微信注册 */
  router.get('/api/app/register', controller.app.register);

};