const mongoDB = require('./db');
module.exports = async (ctx) => {
  let password = await mongoDB.find('UserInfo', { username: 'Aria' });
  if (!ctx.session.userInfo) {
    ctx.redirect('/signin')
  } else if (!(ctx.session.userInfo.username === 'Aria' && ctx.session.userInfo.password == password[0].password)) {
    await ctx.render('setAlert', {
      info: '没有权限'
    });
  } else {
    return true;
  }
}
