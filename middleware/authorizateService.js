
const db = require('../db/db');

module.exports = async (ctx, next) => {

  if (!ctx.params.id) ctx.throw(422, 'id required');

  let serviceId = ctx.params.id

  let userId = ctx.request.jwtPayload.data.sub 

  let pivot = await db.select(['areaId'])
  .from('user_area')
  .where({ userId: userId })

  let areas = []

  for (const area of pivot) {
    let res = await db.select(['id'])
    .from('areas')
    .where({ id: area.areaId })
    areas.push({
      ...res[0]
    })
  } 

  let services = []

  for (const area of areas) {
    let res = await db.select(['id'])
    .from('services')
    .where({ areaId: area.id })
    services.push({
      ...res[0]
    })
  }

  if (!services.length) ctx.throw(err.status || 403, err.text);  

  await next();
};