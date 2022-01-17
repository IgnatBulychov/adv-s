const db = require('../../db/db');
const fs = require('fs');

module.exports = async (ctx) => {
  const { title, description, price } = ctx.request.body;

  if (!title) ctx.throw(422, 'Area title required');
  if (!price) ctx.throw(422, 'Price required');
  if (!description) ctx.throw(422, 'Price required');

  let serviceId = ctx.params.serviceId

  let res = await db('services')
  .where({ id: serviceId })
  .update({
    title: title,
    description: description,
    price: price
  })

  ctx.body = 'success' 
};