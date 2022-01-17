const db = require('../../db/db');

module.exports = async (ctx) => {

  let networks = await db(['id', 'title', 'poster'])
  .from('networks')

  networks.map((value) => {
    value.poster =  'http://' + ctx.request.header.host + value.poster
    return value    
  })

  ctx.body = networks
};