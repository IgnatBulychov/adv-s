const db = require('../../db/db');
const fs = require('fs');

module.exports = async (ctx) => {
  const { title, description, networkId, poster, numberOfFollowers, isPosterChanges } = ctx.request.body;

  if (!title) ctx.throw(422, 'Area title required');
  if (!networkId) ctx.throw(422, 'networkId required');
  if (!ctx.params.areaId) ctx.throw(422, 'areaId required');

  let areaId = ctx.params.areaId

  console.log(isPosterChanges)

  if (poster && isPosterChanges) {
    fs.unlink(`public/storage/areas/avatars/${areaId}.png}`, function(err){
      fs.writeFile(`public/storage/areas/avatars/${areaId}.png`, poster.replace(/^data:image\/\w+;base64,/, ''), {encoding: 'base64'}, function(err){
      });
    })
  }

  let changes = {
    title: title,
    description: description,
    numberOfFollowers: numberOfFollowers ? numberOfFollowers : null,
    networkId: networkId
  }

  if (poster && isPosterChanges) {    
    changes.poster = `/storage/areas/avatars/${areaId}.png`
  }

  let res = await db('areas')
  .where({ id: areaId })
  .update(changes)

  

  ctx.body = 'success' 
};