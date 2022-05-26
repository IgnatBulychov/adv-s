
const db = require('../db/db');

module.exports = async (ctx, next) => {

  if (!ctx.params.offerId) ctx.throw(422, 'offerId required');

  let offer = await db.select(['id', 'title', 'text', 'buyerId', 'image', 'status', 'areaId', 'quantity', 'link','createdAt'])
  .from('offers')
  .where({ id: ctx.params.offerId })
  .first()

  let area = await db.select(['id', 'title', 'cpc',  'userId'])
  .from('areas')
  .where({ id: offer.areaId })
  .first()

  let buyer = await db.select(['id', 'firstName', 'lastName', 'avatar'])
  .from('users')
  .where({ id: offer.buyerId })
  .first()

  let seller = await db.select(['id', 'firstName', 'lastName', 'avatar'])
  .from('users')
  .where({ id:  area.userId })
  .first()

  //
  if (![buyer.id,seller.id].includes(ctx.request.jwtPayload.data.sub)) ctx.throw(422, 'access denided');
  //

  ctx.offer = {
    ...offer,
    area,
    buyer,
    seller
  }

  await next();
};