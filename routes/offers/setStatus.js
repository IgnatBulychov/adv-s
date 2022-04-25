const db = require('../../db/db');

module.exports = async (ctx) => {

  if (!ctx.params.offerId) ctx.throw(422, 'offerId required');
  const { status } = ctx.request.body;

  let offer = await db.select(['buyerId', 'areaId', 'status'])
  .from('offers')
  .where({ id: ctx.params.offerId })
  .first()

  let area = await db.select(['id', 'userId'])
  .from('areas')
  .where({ id: offer.areaId })
  .first()

  let buyer = await db.select(['id'])
  .from('users')
  .where({ id: offer.buyerId })
  .first()

  let seller = await db.select(['id'])
  .from('users')
  .where({ id:  area.userId })
  .first()

  /* 
    created
    accepted
    paid
    paymentСonfirmed
    placed
    placedСonfirmed
    completed

    canceledBySeller
    canceledByBuyer
    canceledСonfirmed
  */

  if (![buyer.id,seller.id].includes(ctx.request.jwtPayload.data.sub)) {
    ctx.throw(422, 'access denided')
  }

  let allow = false 

  if (offer.status == 'created' && status == 'accepted' && seller.id == ctx.request.jwtPayload.data.sub) {
    allow = true
  } else if (offer.status == 'accepted' && status == 'paid' && buyer.id == ctx.request.jwtPayload.data.sub) {
    allow = true  
  } else if (offer.status == 'paid' && status == 'paymentСonfirmed' && seller.id == ctx.request.jwtPayload.data.sub) {
    allow = true  
  } else if (offer.status == 'paymentСonfirmed' && status == 'placed' && seller.id == ctx.request.jwtPayload.data.sub) {
    allow = true  
  } else if (offer.status == 'placed' && status == 'placedСonfirmed' && buyer.id == ctx.request.jwtPayload.data.sub) {
    allow = true  
  } else if (offer.status == 'placedСonfirmed' && status == 'completed' && buyer.id == ctx.request.jwtPayload.data.sub) {
    allow = true  
  } else if (status == 'canceledBySeller' && seller.id == ctx.request.jwtPayload.data.sub) {
    if (offer.status ==  'canceledByBuyer') {
      status = 'canceled'
    }
    allow = true  
  } else if (status == 'canceledByBuyer' && offer.id == ctx.request.jwtPayload.data.sub) {
    if (offer.status ==  'canceledBySeller') {
      status = 'canceled'
    }
    allow = true  
  }

  if (allow) {
    await db('offers')
    .where({ id: ctx.params.offerId })
    .update({ status:status })
  } else {
    ctx.throw(422, 'access denided')
  }

  ctx.body = offer
};