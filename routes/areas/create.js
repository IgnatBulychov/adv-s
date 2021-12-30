const db = require('../../db/db');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { title, description } = ctx.request.body;

  if (!title) ctx.throw(422, 'Area title required');
  if (!networkId) ctx.throw(422, 'networkId required');
  

  let areaId = getId()

  let area = {
    id: areaId,
    title: title,
    description: description
  }

  await db('areas').insert(area)

  let userAreaId = getId()

  await db('user_area').insert({
    id: userAreaId,
    userId: ctx.request.jwtPayload.data.sub,
    areaId: areaId
  })
  
  ctx.body = area
};