
const db = require('../../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('../../utilities/bcrypt');

const secret = process.env.JWT_SECRET || 'secret';

module.exports = async (ctx) => {
  const { email, password } = ctx.request.body;

  if (!email) ctx.throw(422, 'Email required.');
  if (!password) ctx.throw(422, 'Password required.'); 

  const user = await db.first(['id', 'email', 'passwordHash', 'firstName', 'lastName', 'avatar'])
  .from('users')
  .where({ email });

  if (!user) ctx.throw(422, 'Неверный логин или пароль');

  if (await bcrypt.compare(password, user.passwordHash)) {
    const payload = { sub: user.id };
    const token = jwt.sign({ 
      exp: Math.floor(Date.now() / 1000) + (60*60*24*7),//1 week
      data: payload 
    }, secret);

    delete user.passwordHash

    ctx.body = {
      user: {
        ...user,
        avatar: 'http://' + ctx.request.header.host + user.avatar,
        token: token 
      }
    };

  } else {
    ctx.throw(401, 'Неверный логин или пароль');
  }

};