const db = require('../../db/db');

module.exports = async (ctx) => {

  if (!ctx.params.offerId) ctx.throw(422, 'offerId required');

  let offer = await db.select(['id', 'title', 'text', 'buyerId', 'image', 'status', 'areaId', 'quantity', 'createdAt'])
  .from('offers')
  .where({ id: ctx.params.offerId })
  .first()

  let area = await db.select(['id', 'title', 'cpc',  'userId'])
  .from('areas')
  .where({ id: offer.areaId })
  .first()

  offer.quantity = Number(offer.quantity)

  offer.areaTitle = area.title

  offer.cpc = Number(area.cpc)

  let resBuyer = await db.select(['id', 'firstName', 'lastName', 'avatar'])
  .from('users')
  .where({ id: offer.buyerId })
  .first()

  resBuyer.avatar = 'http://' + ctx.request.header.host + resBuyer.avatar

  offer.buyer = resBuyer

  let resSeller = await db.select(['id', 'firstName', 'lastName', 'avatar'])
  .from('users')
  .where({ id:  area.userId })
  .first()

  resSeller.avatar = 'http://' + ctx.request.header.host + resSeller.avatar
   
  offer.seller = resSeller

  //
  if (![offer.buyer.id,offer.seller.id].includes(ctx.request.jwtPayload.data.sub)) ctx.throw(422, 'access denided');
  //

  offer.isMine = ctx.request.jwtPayload.data.sub == offer.buyer.id

  ctx.body = offer
};