const db = require('../../db/db');
const fs = require('fs');
const getId = require('../../utilities/getId');

module.exports = async (ctx) => {
  const { title, description, networkId, poster, url, categories, locations, numberOfFollowers, cpc  } = ctx.request.body; //services

  if (!title) ctx.throw(422, 'Area title required');
  if (!networkId) ctx.throw(422, 'networkId required');
  if (!cpc) ctx.throw(422, 'cpc required');

  let areaId = getId()

  if (poster) {
    fs.writeFile(`public/storage/areas/avatars/${areaId}.png`, poster.replace(/^data:image\/\w+;base64,/, ''), {encoding: 'base64'}, function(err){
    });
  }

  let promises = []

  locations.forEach((locality) => {
    promises.push(
      db('locations').insert({
        id: getId(),
        locality: locality.locality,
        fiasCode: locality.fiasCode
      })
      .onConflict('fiasCode')
      .ignore()
    )
  })

  await Promise.all(promises)
  
  let area = {
    id: areaId,
    title: title,
    description: description ? description : null,
    poster: poster ? `/storage/areas/avatars/${areaId}.png` : null,
    numberOfFollowers: numberOfFollowers ? numberOfFollowers : null,
    cpc: cpc,
    url: url,
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

  for (const category of categories) {
    await db('category_area').insert({
      id: getId(),
      categoryId: category,
      areaId: areaId
    })
  }

  let locationsFromBase = await db.select(['id'])
  .from('locations')
  .whereIn('fiasCode', locations.map(locality=>locality.fiasCode))

  for (const locality of locationsFromBase) {
    await db('area_location').insert({
      id: getId(),
      locationId: locality.id,
      areaId: areaId
    })
  }
  
  ctx.body = area 
};