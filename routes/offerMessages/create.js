const db = require('../../db/db');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { text } = ctx.request.body;
  
  if (!text) ctx.throw(422, 'text required'); 

  const id = getId()

  await db('offer_messages').insert({
    id: id,
    text: text,
    offerId: ctx.params.offerId,
    from: ctx.request.jwtPayload.data.sub,
    to: ctx.offer.buyer.id == ctx.request.jwtPayload.data.sub ? ctx.offer.buyer.id : ctx.offer.seller.id,
    text: text,
    isViewed: false
  })

  ctx.body = id
};