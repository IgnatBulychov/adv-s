const db = require('../../db/db');

module.exports = async (ctx) => {


  let ids = await db.select(['userId'])
  .from('user_area')
  .where({ userId: ctx.request.jwtPayload.data.sub })

  console.log(ids)

  let areas = []

  for (const id of ids) {
    let res = await db.select(['id', 'title', 'description', 'poster', 'networkId'])
    .from('areas')
    .where({ id: id })
    areas.push(res.data)
  }

  await Promise.all(areas.map(async (value) => {
    let res = await db.select(['id', 'title', 'poster'])
    .from('network')
    .where({ id: value.networkId })
    return {
      ...value,
      networks: res.data
    }
  }));

  console.log('areas',areas)

  ctx.body = areas
};