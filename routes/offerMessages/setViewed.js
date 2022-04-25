const db = require('../../db/db');

module.exports = async (ctx) => {

  let res = await db('offer_messages')
  .where({ id: ctx.params.messageId })
  .update({
    isViewed: true
  })

  ctx.body = 'success' 
};