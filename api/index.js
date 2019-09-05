const Router = require('koa-router');

// 引入所有路由模块
const User = require('./modules/user');
const Sign = require('./modules/sign');

const router = new Router({
  prefix: '/api'
});

// 注册路由
router.use(User.routes(), User.allowedMethods());
router.use(Sign.routes(), Sign.allowedMethods());

module.exports = router;
