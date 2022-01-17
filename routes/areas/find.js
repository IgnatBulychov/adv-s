const db = require('../../db/db');

module.exports = async (ctx) => {
  const { networkId } = ctx.request.body;

  let areas = []

  let res = await db.select(['id', 'title', 'description', 'poster', 'numberOfFollowers', 'networkId'])
  .from('areas')
  .where({ networkId:networkId })

  res.map(area=>{
    area.poster = 'http://' + ctx.request.header.host + area.poster
  })
  
/*
  await Promise.all(areas.map(async (value) => {
    let resNetworks = await db.select(['id', 'title', 'poster'])
    .from('networks')
    .where({ id: value.networkId })

    resNetworks.map(el => {
      el.poster = 'http://' + ctx.request.header.host + el.poster
      return el
    })
   
    value.network = resNetworks[0]

    let resServices = await db.select(['id', 'title', 'description', 'price'])
    .from('services')
    .where({ areaId: value.id })

    value.services = resServices

    return value    
  }));
*/
  ctx.body = areas
};