const db = require('../../db/db');

module.exports = async (ctx) => {

  let offers = await db.select(['id'])
  .from('offers')
  .where({ areaId: ctx.params.areaId })

  console.log(offers)

  let reviews = await db.select(['id', 'review', 'stars', 'authorId'])
  .from('reviews')
  .whereIn('offerId', offers.map(o=>o.id))

  reviews = reviews.map(r=>{
    r.stars = Number(r.stars)
    return r
  })

  for (key in reviews) {
    let user = await db.select(['id', 'avatar', 'firstName','lastName'])
    .from('users')
    .where({ id: reviews[key].authorId })
    .first()

    if (user.avatar) {
      user.avatar = 'http://' + ctx.request.header.host + user.avatar
    } else {
      user.avatar = null
    }
    reviews[key].author = user
  }

  ctx.body = { 
    reviews
  }

  // разберись покуаптель или продавец поулчает отзыв
};