const db = require('../../db/db');

module.exports = async (ctx) => {

  let messages = await db.select(['id', 'text', 'offerId', 'from' , 'to', 'isViewed'])
  .from('offer_messages')
  .where({
    offerId: ctx.offer.id
  })

  messages.map(message => {
    message.isFromMe = message.from == ctx.request.jwtPayload.data.sub
  })

  ctx.body = messages
};