const db = require('../../db/db');

module.exports = async (ctx) => {

  if (!ctx.params.areaId) ctx.throw(422, 'areaId required');

  let areaId = ctx.params.areaId
  
  let area = await db.select(['id', 'title', 'description', 'poster', 'numberOfFollowers', 'networkId', 'userId','cpc'])
  .from('areas')
  .where({ id: areaId })
  .first()

  console.log('!',areaId)
  
  area.poster = 'http://' + ctx.request.header.host + area.poster

  let resNetworks = await db.select(['id', 'title', 'poster'])
  .from('networks')
  .where({ id: area.networkId })
  .first()

  resNetworks.poster = 'http://' + ctx.request.header.host + resNetworks.poster

  area.network = resNetworks

  let resCategoriesPivot = await db.select(['categoryId'])
  .from('category_area')
  .where({ areaId: area.id })

  console.log(resCategoriesPivot)

  let categories = []

  for (const pivot of resCategoriesPivot) {
    let category = await db.select(['id', 'title'])
    .from('categories')
    .where({ id: pivot.categoryId })
    .first()

    categories.push(category)
  }
 
  area.categories = categories


  /* locations */

  let resLocationsPivot = await db.select(['locationId'])
  .from('area_location')
  .where({ areaId: area.id })

  let locations = []

  for (const pivot of resLocationsPivot) {
    let location = await db.select(['locality', 'fiasCode'])
    .from('locations')
    .where({ id: pivot.locationId })
    .first()

    locations.push(location)
  }
 
  area.locations = locations

  /** */

  area.owner = await db.select(['id', 'firstName', 'lastName', 'avatar'])
  .from('users')
  .where({ id: area.userId })
  .first()

  area.owner.avatar = 'http://' + ctx.request.header.host + area.owner.avatar

  ctx.body = area
};