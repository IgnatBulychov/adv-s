const db = require('../../db/db');

module.exports = async (ctx) => {

  if (!ctx.params.areaId) ctx.throw(422, 'areaId required');
  if (!ctx.params.serviceId) ctx.throw(422, 'serviceId required');

  await db('services')
  .where('id', ctx.params.serviceId)
  .del()

  ctx.body = ctx.params.serviceId
};