const JWT = require('jsonwebtoken');
const JWT_SECRET = 'USER_TOKEN';

/**
 * 生成token
 * @param config = {} 用户信息
 */
exports.createToken = (config = {}, expiresIn = '7 day') => {
  const { userName, _id } = config;
  const options = { userName, _id };
  return JWT.sign(options, JWT_SECRET, { expiresIn });
};

/**
 * 解析token
 */
exports.decodeToken = (token) => {
  return JWT.decode(token);
};

/**
 * 解析header中的authorization
 * 注意⚠️前端传token的话必须按照koa-jwt格式传
 * Bearer中间有个空格再加token
 * authorization: Bearer token
 * @param ctx 上下文
 */
exports.parseAuth = ctx => {
  if (!ctx || !ctx.header.authorization) return null;
  const parts = ctx.header.authorization.split(' ');
  if (parts.length < 2) return null;
  return parts[1];
}

exports.JWT_SECRET = JWT_SECRET;
