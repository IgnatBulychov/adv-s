const db = require('../../db/db');

module.exports = async (ctx) => {

  let offers = await db.select(['id', 'title', 'text', 'image', 'status','areaId', 'quantity', 'createdAt'])
  .from('offers')
  .where({ buyerId: ctx.request.jwtPayload.data.sub })

  let areas = await db.select(['id', 'title', 'cpc'])
  .from('areas')
  .where({ id: offers[0] ? offers[0].areaId : null })
  

  await Promise.all(offers.map(async (value) => {
   
    value.quantity = Number(value.quantity)

    value.areaTitle = areas[0].title

    value.cpc = Number(areas[0].cpc)    

  }));


  ctx.body = offers
};