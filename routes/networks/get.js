import { db } from '../../db/db';

export default async (ctx) => {

  let networks = await db(['id', 'title', 'poster'])
  .from('networks')

  ctx.body = networks
};