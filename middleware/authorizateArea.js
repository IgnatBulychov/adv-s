
const db = require('../db/db');

module.exports = async (ctx, next) => {

  if (!ctx.params.areaId) ctx.throw(422, 'id required');

  let areaId = ctx.params.areaId

  let userId = ctx.request.jwtPayload.data.sub 

  let pivot = await db.select(['id'])
  .from('user_area')
  .where({ 
    areaId: areaId,
    userId: userId
  })

  if (!pivot.length) ctx.throw(err.status || 403, err.text);  

  await next();
};