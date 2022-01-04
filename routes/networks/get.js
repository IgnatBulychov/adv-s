const db = require('../../db/db');

module.exports = async (ctx) => {

  let networks = await db(['id', 'title', 'poster'])
  .from('networks')

  ctx.body = networks
};