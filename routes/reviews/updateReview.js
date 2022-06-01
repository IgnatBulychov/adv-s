const db = require('../../db/db');

module.exports = async (ctx) => {
  const { text, value } = ctx.request.body;

  let review = await db.select(['authorId'])
  .from('reviews')
  .where({ id: ctx.params.reviewId })
  .first()

  if (review.authorId != ctx.request.jwtPayload.data.sub) ctx.throw(422, 'access deni'); 

  let res = await db('reviews')
  .where({ id: ctx.params.reviewId })
  .update({
    review: text,
    stars: value
  })


  ctx.body = review
};