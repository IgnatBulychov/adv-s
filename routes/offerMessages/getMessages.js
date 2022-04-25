const db = require('../../db/db');

module.exports = async (ctx) => {

  let messages = await db('offer_messages')

  messages.map(message => {
    message.isFromMe = message.from == ctx.request.jwtPayload.data.sub
  })

  ctx.body = messages
};