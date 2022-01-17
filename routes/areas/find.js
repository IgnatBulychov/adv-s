const db = require('../../db/db');

module.exports = async (ctx) => {

  let networksIds = ctx.query.networksIds ? ctx.query.networksIds.split(',') : []

  console.log(networksIds)

  let res = null

  if (networksIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster', 'numberOfFollowers', 'networkId'])
    .from('areas')
    .whereIn('networkId', networksIds)
  } else {
    res = await db.select(['id', 'title', 'description', 'poster', 'numberOfFollowers', 'networkId'])
    .from('areas')
  }
  
  
  let areas = res.map(area=>{
    area.poster = 'http://' + ctx.request.header.host + area.poster
    return area
  })

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

    resServices.map(service=>{service.areaId = value.id})

    value.services = resServices

    return value    
  }));


  
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