const db = require('../../db/db');
const fs = require('fs');

module.exports = async (ctx) => {

  if (!ctx.params.areaId) ctx.throw(422, 'id required');

  let res = await db.select(['poster'])
  .from('areas')
  .where({ id:  ctx.params.areaId })

  fs.unlink(`public/${res[0].poster}`, function(err){
  })

  await db('areas')
  .where('id', ctx.params.areaId)
  .del()

  ctx.body = ctx.params.areaId
};