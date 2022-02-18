const db = require('../../db/db');

module.exports = async (ctx) => {
  
  let user = await db.select(['id', 'about', 'firstName', 'lastName', 'avatar'])
  .from('users')
  .where({ id: ctx.request.jwtPayload.data.sub })
  
  user[0].avatar = 'http://' + ctx.request.header.host + user[0].avatar
 
  ctx.body = user[0]
};