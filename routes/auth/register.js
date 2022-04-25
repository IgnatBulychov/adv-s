
const getId = require('../../utilities/getId');
const db = require('../../db/db');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';
const bcrypt = require('../../utilities/bcrypt');

module.exports = async (ctx) => {
  const { email, password, isSeller, isBuyer, firstName = '', lastName = '', avatar =''} = ctx.request.body;

  if (!email) ctx.throw(422, 'Email required.');
  if (!password) ctx.throw(422, 'Password required.');

  let id = getId()

  let passwordHash = await bcrypt.hash(password)

  
  await db('users').insert({
    id: id,
    email: email,
    firstName: firstName,
    lastName: lastName,
    avatar: avatar,
    isSeller: isSeller,
    isBuyer: isBuyer,
    isPremium: false,
    clicksReserve: 1000,
    passwordHash: passwordHash
  })
  
  
  // login



    ctx.body = {
      user: {
        email: email, 
        token: jwt.sign({ 
          exp: Math.floor(Date.now() / 1000) + (60*60*24*7),//1 week
          data: { sub:id } 
        }, secret),
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        isSeller: isSeller,
        isBuyer: isBuyer,
      }
    };

};