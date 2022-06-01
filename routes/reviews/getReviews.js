const db = require('../../db/db');

module.exports = async (ctx) => {

  let reviews = await db.select(['id', 'review', 'stars', 'authorId'])
  .from('reviews')
  .where({ offerId: ctx.offer.id })

  reviews = reviews.map(r=>{
    r.stars = Number(r.stars)
    return r
  })

  ctx.body = { 
    reviews
  }

  // разберись покуаптель или продавец поулчает отзыв
};