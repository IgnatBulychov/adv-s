const db = require('../../db/db');

module.exports = async (ctx) => {

  ctx.offer.quantity = Number(ctx.offer.quantity)

  ctx.offer.area.cpc = Number(ctx.offer.area.cpc)

  ctx.offer.image = ctx.offer.image ? 'http://' + ctx.request.header.host + ctx.offer.image : null

  ctx.offer.buyer.avatar = ctx.offer.buyer.avatar ? 'http://' + ctx.request.header.host + ctx.offer.buyer.avatar : null

  ctx.offer.seller.avatar = ctx.offer.seller.avatar ? 'http://' + ctx.request.header.host + ctx.offer.seller.avatar : null

  ctx.offer.isMine = ctx.request.jwtPayload.data.sub == ctx.offer.buyer.id

  ctx.offer.linkWithTracker = `http://localhost:3000/r?o=${ctx.offer.id}&u=${ctx.offer.link}`

  ctx.body = ctx.offer
};