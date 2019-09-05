const Router = require('koa-router');
const mongoose = require('mongoose');
const { yearWithMonthAndDay, yearWithMonth, monthInit } = require('../../utils/moment');
const { getUserInfo } = require('../../utils/user');
const { getSignList } = require('../../utils/sign');

const router = new Router();

/**
 * 签到
 */
router.post('/sign', async ctx => {
  await getUserInfo(ctx)
  .then(async user => {
    if (user) {
      const SignModel = mongoose.model('Sign');
      await SignModel.findOne({
        userId: user._id,
        signDay: yearWithMonthAndDay(),
      })
      .then(async signDate => {
        if (signDate) {
          return ctx.body = {
            code: 400,
            message: '今日已签到'
          }
        } else {
          await SignModel({
            userId: user._id,
            userName: user.userName
          }).save()
          .then(() => {
            return ctx.body = {
              code: 200,
              message: '签到成功'
            }
          })
          .catch(err => {
            console.log(`签到失败${err}`);
          });
        }
      })
    } else {
      return ctx.body = {
        code: 400,
        message: '没有该用户'
      }
    }
  })
});

/**
 * 获取当月的签到状态
 * @param month 格式为201912，区分年
 */
router.get('/getSignList', async ctx => {
  await getSignList(ctx)
  .then(async signDate => {
    return ctx.body = {
      code: 200,
      data: await monthInit(signDate),
      message: '成功',
    }
  })
  .catch(err => {
    return ctx.body = {
      code: 400,
      message: err,
    }
  });
});

/**
 * 获取当月的签到天数
 * @param month 格式为201912，区分年
 */
router.get('/getHasSignList', async ctx => {
  await getSignList(ctx)
  .then(async signDate => {
    return ctx.body = {
      code: 200,
      data: signDate,
      totalCount: signDate.length,
      message: '成功',
    }
  })
  .catch(err => {
    return ctx.body = {
      code: 400,
      message: err,
    }
  });
 });

module.exports = router;
