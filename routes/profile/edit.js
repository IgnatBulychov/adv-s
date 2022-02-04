const db = require('../../db/db');

module.exports = async (ctx) => {
  const { firstName, lastName, about } = ctx.request.body;

  if (!firstName) ctx.throw(422, 'firstName required');
  if (!lastName) ctx.throw(422, 'lastName required');
  if (!about) ctx.throw(422, 'about required');

  let userId = ctx.request.jwtPayload.data.sub

  let res = await db('users')
  .where({ id: userId })
  .update({
    firstName: firstName,
    lastName: lastName,
    about: about
  })

  ctx.body = 'success' 
};