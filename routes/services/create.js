const db = require('../../db/db');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { title, description, price } = ctx.request.body;

  if (!title) ctx.throw(422, 'Area title required');
  if (!price) ctx.throw(422, 'Price required');

  let areaId = ctx.params.areaId

  await db('services').insert({
    id: getId(),
    areaId: areaId,
    price: price,
    title: title,
    description: description
  })

  ctx.body = 'success'  // переделать на объект и добавлять в web приложении
};