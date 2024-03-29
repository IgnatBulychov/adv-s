const db = require('../../db/db');

module.exports = async (ctx) => {
  
  let areas = await db.select(['id', 'title', 'description', 'poster', 'numberOfFollowers', 'networkId', 'cpc', 'url'])
  .from('areas')
  .where({ userId: ctx.request.jwtPayload.data.sub })
  
  areas.map(area=>{
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

    let resCategoriesPivot = await db.select(['categoryId'])
    .from('category_area')
    .where({ areaId: value.id })


    let categories = []

    for (const pivot of resCategoriesPivot) {
      let category = await db.select(['id', 'title'])
      .from('categories')
      .where({ id: pivot.categoryId })

      categories.push(category[0])
    }
   
    value.categories = categories


    /* locations */

    let resLocationsPivot = await db.select(['locationId'])
    .from('area_location')
    .where({ areaId: value.id })

    let locations = []

    for (const pivot of resLocationsPivot) {
      let location = await db.select(['locality', 'fiasCode'])
      .from('locations')
      .where({ id: pivot.locationId })
      .first()

      locations.push({
        fiasCode: location.fiasCode,
        locality: location.locality
      })
    }
  
    value.locations = locations

    /** */

   /* let resServices = await db.select(['id', 'title', 'description', 'price'])
    .from('services')
    .where({ areaId: value.id })

    resServices.map(service=>{service.areaId = value.id})

    value.services = resServices*/

    return value    
  }));

  ctx.body = areas
};