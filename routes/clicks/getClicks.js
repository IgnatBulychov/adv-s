const db = require('../../db/db');

module.exports = async (ctx) => {

  let { perPage, currentPage } = ctx.request.query;
  
  let [clicks, count] = await Promise.all([    
    db.select(['id', 'ip', 'createdAt', 'isDouble'])
    .from('clicks')
    .where({ offerId: ctx.offer.id })
    .paginate({ perPage: Number(perPage), currentPage: Number(currentPage) })
    ,
    db.select()
    .from('clicks')
    .where({ offerId: ctx.offer.id, isDouble: false })
    .count() 
  ])

  console.log( clicks, count)

  ctx.body = { clicks, count }
};