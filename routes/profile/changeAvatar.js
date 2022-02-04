const db = require('../../db/db');

module.exports = async (ctx) => {
  const { avatar } = ctx.request.body;

  if (!avatar) ctx.throw(422, 'avatar required');

  let userId = ctx.request.jwtPayload.data.sub

  fs.unlink(`public/storage/users/avatars/${userId}.png}`, function(err){
    fs.writeFile(`public/storage/users/avatars/${userId}.png`, avatar.replace(/^data:image\/\w+;base64,/, ''), {encoding: 'base64'}, function(err){
    });
  })

  let res = await db('users')
  .where({ id: userId })
  .update({
    avatar: `/storage/areas/avatars/${areaId}.png`
  })

  ctx.body = 'success' 
};