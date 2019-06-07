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

    /* 角色列表 */
    router.get('/api/role/queryList', UserInterceptor, controller.role.queryList);

    /* 查询商家食品列表 */
    router.get('/api/food/queryList', controller.food.queryList);
    /* 查询审核通过食品列表 */
    router.get('/api/food/queryAdminList', controller.food.queryAdminList);
    /* 查询商铺推荐产品列表 */
    router.get('/api/food/queryListByShopId', controller.food.queryListByShopId);

    /* 查询产品详情 */
    router.get('/api/food/queryDetail', controller.food.queryDetail);
    /* 新增产品 */
    router.post('/api/food/add', UserInterceptor, controller.food.add);
    /* 更新产品信息 */
    router.post('/api/food/update', UserInterceptor, controller.food.update);
    /* 删除产品 */
    router.post('/api/food/delete', UserInterceptor, controller.food.delete);
    /* 查询产品全部分类列表 */
    router.get('/api/food/queryAllCategoryList', controller.food.queryAllCategoryList);
    /* 查询产品分类列表 */
    router.get('/api/food/queryCategoryList', UserInterceptor, controller.food.queryCategoryList);
    /* 新增产品分类 */
    router.post('/api/food/categoryAdd', UserInterceptor, controller.food.categoryAdd);
    /* 查看产品分类信息 */
    router.get('/api/food/categoryDetail', UserInterceptor, controller.food.categoryDetail);
    /* 更新产品分类信息 */
    router.post('/api/food/categoryUpdate', UserInterceptor, controller.food.categoryUpdate);
    /* 删除产品分类信息 */
    router.post('/api/food/categoryDelete', UserInterceptor, controller.food.categoryDelete);
    /* 推荐 */
    router.post('/api/food/recommend', controller.food.recommend);
    /* 食品审核 */
    router.post('/api/food/check', controller.food.check);
    /* 查询食品Top3 */
    router.get('/api/food/queryListTop3', controller.food.queryListTop3);

    /* 附件上传 */
    router.post('/api/attachment/upload', controller.attachment.upload);
    /* 根据id查找附件 */
    router.get('/api/attachment/queryListByIds', controller.attachment.queryListByIds);

    /*
     * APP接口
     */
    /* 微信授权登录 */
    router.get('/api/app/login', controller.app.login);
    /* 移动获取顶部滚动图片 */
    router.get('/api/app/queryTopSliderList', controller.app.queryTopSliderList);
    /* 查询顶部滚动图片详情 */
    router.get('/api/app/queryTopSliderDetail', controller.app.queryTopSliderDetail);
    /* 新增移动端滚动图片 */
    router.post('/api/app/addTopSlider', UserInterceptor, controller.app.addTopSlider);
    /* 修改移动端滚动图片 */
    router.post('/api/app/updateTopSlider', UserInterceptor, controller.app.updateTopSlider);
    /* 删除移动端滚动图片 */
    router.post('/api/app/delTopSlider', UserInterceptor, controller.app.delTopSlider);

    // socket.io
    io.of('/').route('exchange', io.controller.nsp.exchange);
};
