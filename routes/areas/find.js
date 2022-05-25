const db = require('../../db/db');

module.exports = async (ctx) => {

  let networksIds = ctx.query.networksIds ? ctx.query.networksIds.split(',') : []
  let categoriesIds = ctx.query.categoriesIds ? ctx.query.categoriesIds.split(',') : []
  let locationsIds = ctx.query.locationsIds ? ctx.query.locationsIds.split(',') : []


  let areaIdsCategoriesPivot = await db.select(['areaId'])
  .from('category_area')
  .whereIn('categoryId', categoriesIds)

  let areaIdsLocationsPivot = await db.select(['areaId'])
  .from('area_location')
  .whereIn('locationId', locationsIds)




  let res = null

  // 1 networksIds categoriesIds locationsIds
  if (networksIds.length && categoriesIds.length && locationsIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster', 'cpc', 'numberOfFollowers', 'networkId', 'userId'])
    .from('areas')
    .whereIn('networkId', networksIds)
    .intersect(function() {
      this.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
      .from('areas')
      .whereIn('id', areaIdsCategoriesPivot.map(el=>{return el.areaId}))
      .intersect(function() {
        this.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
        .from('areas')
        .whereIn('id', areaIdsLocationsPivot.map(el=>{return el.areaId}))
      })
    })

  // 2  networksIds categoriesIds
  } else if (networksIds.length && categoriesIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster', 'cpc', 'numberOfFollowers', 'networkId', 'userId'])
    .from('areas')
    .whereIn('networkId', networksIds)
    .intersect(function() {
      this.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
      .from('areas')
      .whereIn('id', areaIdsCategoriesPivot.map(el=>{return el.areaId}))
    })
  
  // 3 categoriesIds locationsIds
  } else if (categoriesIds.length && locationsIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster', 'cpc', 'numberOfFollowers', 'networkId', 'userId'])
    .from('areas')
    .whereIn('id', areaIdsCategoriesPivot.map(el=>{return el.areaId}))
    .intersect(function() {
      this.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
      .from('areas')
      .whereIn('id', areaIdsLocationsPivot.map(el=>{return el.areaId}))
    })

   // 4 networksIds locationsIds
  } else if (categoriesIds.length && locationsIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster', 'cpc', 'numberOfFollowers', 'networkId', 'userId'])
    .from('areas')
    .whereIn('networkId', networksIds)
    .intersect(function() {
      this.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
      .from('areas')
      .whereIn('id', areaIdsLocationsPivot.map(el=>{return el.areaId}))
    })

   // 5 networksIds
  }  else if (networksIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
    .from('areas')
    .whereIn('networkId', networksIds)
  // 6 categoriesIds
  } else if (categoriesIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
    .from('areas')
    .whereIn('id', areaIdsCategoriesPivot.map(el=>{return el.areaId}))
 
   // 7 locationsIds
  } else if (locationsIds.length) {
    res = await db.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
    .from('areas')
    .whereIn('id', areaIdsLocationsPivot.map(el=>{return el.areaId}))
 
 
   // 8 noone
  } else {
    res = await db.select(['id', 'title', 'description', 'poster','cpc', 'numberOfFollowers', 'networkId', 'userId'])
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

   /* let resServices = await db.select(['id', 'title', 'description', 'price'])
    .from('services')
    .where({ areaId: value.id })

    resServices.map(service=>{service.areaId = value.id})

    value.services = resServices*/

    return value    
  }));

  await Promise.all(areas.map(async (value) => {
    let resOwners = await db.select(['id', 'firstName', 'lastName', 'avatar'])
    .from('users')
    .where({ id: value.userId })

    resOwners.map(el => {
      el.avatar = 'http://' + ctx.request.header.host + el.avatar
      return el
    })
   
    value.owner = resOwners[0]

   /* let resServices = await db.select(['id', 'title', 'description', 'price'])
    .from('services')
    .where({ areaId: value.id })

    resServices.map(service=>{service.areaId = value.id})

    value.services = resServices*/

    return value    
  }));


  ctx.body = areas
};