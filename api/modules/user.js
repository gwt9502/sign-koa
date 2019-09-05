const Router = require('koa-router');
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const { createToken } = require('../../utils/token');
const { getUserInfo } = require('../../utils/user');

const router = new Router();

/**
 * 注册
 * @param userName
 * @param password
 * @param phone
 * @param verifyCode
 */
router.post('/register', async ctx => {
  const data = ctx.request.body;
  if (!data.userName || !data.password || !data.phone) {
    return ctx.body = {
      code: 400,
      message: '缺少参数'
    };
  }
  const UserModel = mongoose.model('User');
  await UserModel.findOne({
    userName: data.userName || 'hello',
  })
  .then(async user => {
    if (user) {
      return ctx.body = {
        code: 400,
        message: '用户已存在'
      };
    } else {
      await UserModel(data).save()
      .then(() => {
        return ctx.body = {
          code: 200,
          message: '注册成功',
        };
      })
      .catch(err => {
        console.log(`用户注册失败${err}`);
      });
    }
  })
  .catch(err => {
    console.log(`查找用户失败${err}`);
  });
});

/**
 * 登录
 * @param userName
 * @param password
 * @param phone
 * @param verifyCode
 */
router.post('/login', async ctx => {
  const data = ctx.request.body;
  if (!data.userName || !data.password) {
    return ctx.body = {
      code: 400,
      message: '缺少参数'
    };
  }
  const UserModel = mongoose.model('User');
  await UserModel.findOne({
    userName: data.userName,
    password: md5(data.password),
  })
  .then(async user => {
    if (user) {
      return ctx.body = {
        code: 200,
        data: {
          token: createToken(data)
        },
        message: '登录成功',
      }
    } else {
      return ctx.body = {
        code: 400,
        message: '用户不存在',
      }
    }
  })
  .catch(err => {
    console.log(`查找用户失败${err}`);
  });
});

/**
 * 获取用户信息
 */
router.get('/getUserInfo', async ctx => {
  await getUserInfo(ctx)
  .then(async user => {
    if (user) {
      return ctx.body = {
        code: 200,
        data: user
      };
    }
  });
});

module.exports = router;
