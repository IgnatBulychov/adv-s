const db = require('../../db/db');

module.exports = async (ctx) => {

  let locations = await db(['id', 'locality', 'fiasCode'])
  .from('locations')

  ctx.body = locations
};