const db = require('../../db/db');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { quantity, title, link, text, image, comment, areaId } = ctx.request.body; //services

  if (!quantity) ctx.throw(422, 'quantity required');
  if (!title) ctx.throw(422, 'title required');  
  if (!text) ctx.throw(422, 'text required');
  if (!link) ctx.throw(422, 'link required');
  if (!quantity) ctx.throw(422, 'quantity title required');

  
  let areas = await db.select(['id', 'userId'])
  .from('areas')
  .where({ userId: ctx.request.jwtPayload.data.sub })

  if (areas.some(area => area.id == areaId)) ctx.throw(422, 'Вы не можете создать заказ, так как Вы являетесь владельцем площадки');  

  let id = getId()

  if (image) {
    fs.writeFile(`public/storage/offers/images/${id}.png`, image.replace(/^data:image\/\w+;base64,/, ''), {encoding: 'base64'}, function(err){
    });
  }

  let offer = {
    id: getId(),
    quantity: quantity,
    comment: comment ? comment : null,
    areaId: areaId,
    title: title,
    text: text,
    link: link,
    image: image ? `/storage/offers/images/${id}.png` : null,
    buyerId: ctx.request.jwtPayload.data.sub,
    status: 'created'
  }

  await db('offers').insert(offer)

  ctx.body = offer 
};