const db = require('../../db/db');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { text, value } = ctx.request.body;
  
  if (ctx.offer.status == 'created' || ctx.offer.status == 'accepted') ctx.throw(422, 'рано'); 

  const id = getId()

  let review = {
    id: id,
    authorId: ctx.request.jwtPayload.data.sub,
    offerId: ctx.offer.id,
    review: text,
    stars: value
  }

  await db('reviews').insert(review)

  ctx.body = review
};