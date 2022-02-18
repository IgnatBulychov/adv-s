const db = require('../../db/db');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { quantity, comment, areaId, sellerId, buyerId } = ctx.request.body; //services

  if (!quantity) ctx.throw(422, 'quantity title required');

  let offer = {
    id: getId(),
    quantity: quantity,
    comment: comment ? comment : null,
    areaId: areaId,
    buyerId: buyerId,
    sellerId: sellerId,
    status: 'created'
  }

  await db('areas').insert(offer)

  ctx.body = offer 
};