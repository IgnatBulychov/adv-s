
const db = require('../db/db');

module.exports = async (ctx, next) => {

  if (!ctx.params.areaId) ctx.throw(422, 'id required');

  let areaId = ctx.params.areaId

  let userId = ctx.request.jwtPayload.data.sub 

  let areas = await db.select(['id', 'userId'])
  .from('areas')
  .where({
    id: areaId,
    userId: userId 
  })

  if (!areas.length) ctx.throw(403, 'not');  

  await next();
};