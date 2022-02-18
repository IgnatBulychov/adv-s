const db = require('../../db/db');
const fs = require('fs');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { title, description, networkId, poster, categories, numberOfFollowers, cpc  } = ctx.request.body; //services

  if (!title) ctx.throw(422, 'Area title required');
  if (!networkId) ctx.throw(422, 'networkId required');
  if (!cpc) ctx.throw(422, 'cpc required');

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
    cpc: cpc,
    networkId: networkId,
    userId:  ctx.request.jwtPayload.data.sub
  }

  await db('areas').insert(area)
/*
  for (const service of services) {
    await db('services').insert({
      id: getId(),
      areaId: areaId,
      price: service.price,
      title: service.title,
      description: service.description
    })
  }
*/
  console.log(categories)

  for (const category of categories) {
    await db('category_area').insert({
      id: getId(),
      categoryId: category,
      areaId: areaId
    })
  }
  
  ctx.body = area 
};