const db = require('../../db/db');
const getId = require('../../utilities/getId');
let geoip = require('geoip-lite');

module.exports = async (ctx) => {

  const id = getId()
  let isDouble = false

  let offer = await db.select(['link'])
  .from('offers')
  .where({ id: ctx.params.offerId })
  .first()

  console.log(offer)

  if (offer.link != ctx.request.body.link) { console.log('link != url'); ctx.throw(422, 'link != url'); }

  let doubles = await db.select(['ip'])
  .from('clicks')
  .where({ ip: ctx.request.ip })

  if (doubles.length) isDouble = true



  let country = geoip.lookup(ctx.request.ip);
console.log('!!!!',country)

  let click = {
    id: id,
    offerId: ctx.params.offerId,
    isDouble,
    ip: ctx.request.ip
  }

  await db('clicks').insert(click)

  ctx.body = click
};