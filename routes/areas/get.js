const db = require('../../db/db');

module.exports = async (ctx) => {

  let pivot = await db.select(['areaId'])
  .from('user_area')
  .where({ userId: ctx.request.jwtPayload.data.sub })

  let areas = []

  for (const area of pivot) {
    let res = await db.select(['id', 'title', 'description', 'poster', 'networkId'])
    .from('areas')
    .where({ id: area.areaId })
    areas.push({
      ...res[0],
      poster: 'http://' + ctx.request.header.host + res[0].poster
    })
  } 

  console.log(areas)

  await Promise.all(areas.map(async (value) => {
    let res = await db.select(['id', 'title', 'poster'])
    .from('networks')
    .where({ id: value.networkId })
   
    value.network = res[0]
    return value    
  }));

  ctx.body = areas
};