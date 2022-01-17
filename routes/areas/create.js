const db = require('../../db/db');
const fs = require('fs');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { title, description, networkId, poster, services, numberOfFollowers } = ctx.request.body;

  if (!title) ctx.throw(422, 'Area title required');
  if (!networkId) ctx.throw(422, 'networkId required');

  let areaId = getId()

  if (poster) {
    fs.writeFile(`public/storage/areas/avatars/${areaId}.png`, poster.replace(/^data:image\/\w+;base64,/, ''), {encoding: 'base64'}, function(err){
    });
  }

  let area = {
    id: areaId,
    title: title,
    description: description ? description : null,
    poster: poster ? `/storage/areas/avatars/${areaId}.png` : null,
    numberOfFollowers: numberOfFollowers ? numberOfFollowers : null,
    networkId: networkId
  }

  await db('areas').insert(area)

  let userAreaId = getId()

  await db('user_area').insert({
    id: userAreaId,
    userId: ctx.request.jwtPayload.data.sub,
    areaId: areaId
  })

  for (const service of services) {
    await db('services').insert({
      id: getId(),
      areaId: areaId,
      price: service.price,
      title: service.title,
      description: service.description
    })
  }
  
  ctx.body = area 
};