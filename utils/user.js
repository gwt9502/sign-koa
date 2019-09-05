const Mongoose = require('mongoose');
const { decodeToken, parseAuth } = require('./token');

const getUserInfo = ctx => {
  return new Promise((resolve, reject) => {
    const authorization = parseAuth(ctx);
    const token = decodeToken(authorization);
    const { userName } = token;
    const userModal = Mongoose.model('User');
    userModal.findOne({
      userName: userName,
    })
    .then( user => {
      resolve(user);
    })
    .catch(err => {
      reject(err);
    });
  });
};

module.exports = {
  getUserInfo,
}