const db = require('../../db/db');

module.exports = async (ctx) => {

  let categories = await db(['id', 'title'])
  .from('categories')

  ctx.body = categories
};