const db = require('../../db/db');

module.exports = async (ctx) => {

  if (!ctx.params.id) ctx.throw(422, 'id required');

  await db('areas')
  .where('id', ctx.params.id)
  .del()

  ctx.body = ctx.params.id
};