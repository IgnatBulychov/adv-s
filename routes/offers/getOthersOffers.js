const db = require('../../db/db');

module.exports = async (ctx) => {

  let areas = await db.select(['id', 'title', 'cpc'])
  .from('areas')
  .where({ userId: ctx.request.jwtPayload.data.sub })
 
  areasIds = areas.map(a=>a.id)

  let offers = await db.select(['id', 'title', 'text', 'image', 'buyerId', 'status','areaId', 'quantity', 'createdAt'])
  .from('offers')
  .where((builder) =>
    builder.whereIn('areaId', areasIds)
  )
  

  await Promise.all(offers.map(async (value) => {

    if (value.image) {
      value.image = 'http://' + ctx.request.header.host + value.image
    }

    let resBuyers = await db.select(['id', 'firstName', 'lastName', 'avatar'])
    .from('users')
    .where({ id: value.buyerId })

    resBuyers.map(el => {
      el.avatar = 'http://' + ctx.request.header.host + el.avatar
      return el
    })
   
    value.buyer = resBuyers[0]

    value.quantity = Number(value.quantity)

    let area = areas.find(area => area.id == value.areaId)

    value.areaTitle = area.title

    value.cpc = Number(area.cpc)

  }));


  ctx.body = offers
};