const db = require('../../db/db');

const Event = require('../offerEvents/offerEvents');

module.exports = async (ctx) => {

  if (!ctx.params.offerId) ctx.throw(422, 'offerId required');
  let { status } = ctx.request.body;

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
    /*if (offer.status ==  'canceledByBuyer' || offer.status == 'created') {
      status = 'canceled'
    }*/
    status = 'canceledBySeller'
    allow = true
  } else if (status == 'canceledByBuyer' && buyer.id == ctx.request.jwtPayload.data.sub) {
    /*if (offer.status ==  'canceledBySeller' || offer.status == 'created' || offer.status == 'accepted') {
      status = 'canceled'
    }*/
    status = 'canceledByBuyer'
    allow = true
  }
  
  if (allow) {
    await db('offers')
    .where({ id: ctx.params.offerId })
    .update({ status:status })
  } else {
    ctx.throw(422, 'access denided')
  }

  new Event({
    status: status,
    userId: ctx.request.jwtPayload.data.sub,
    offerId: ctx.params.offerId,
  }).save()



  ctx.body = status
};