const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');
const { connect, initSchemas } = require('./database/index');
const router = require('./api/index');
const { JWT_SECRET } = require('./utils/token');

const app = new Koa();

// 连接数据库
connect()
.then(() => {
  initSchemas();
});

// 挂载路由前先挂载 koa-bodyparser
app.use(bodyParser());

/**
 * koaJwt对需要校验token的路由进行校验，校验不通过的话返回401状态码
 * 需要在koaJwt中间件之前挂载
 */
app.use(async (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.body = {
        code: 401,
        message: '暂未登录'
      }
    } else {
      ctx.body = err;
      throw err;
    }
  });
});

/**
 * 路由拦截token校验
 */
const unAuthRouter = ['/api/login', '/api/register'];
app.use(
  koaJwt({
    secret: JWT_SECRET,
  }).unless({
    path: unAuthRouter,
  })
);

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(1234, () => {
  console.log('1234');
})