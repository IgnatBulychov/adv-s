
import { db } from '../../db/db';
import { sign } from 'jsonwebtoken';
import { compare } from '../../utilities/bcrypt';

const secret = process.env.JWT_SECRET || 'secret';

export default async (ctx) => {
  const { email, password } = ctx.request.body;

  console.log('!!!')

  if (!email) ctx.throw(422, 'Email required.');
  if (!password) ctx.throw(422, 'Password required.'); 

  const user = await db(['id', 'email', 'passwordHash'])
  .from('users')
  .where({ email }); 

  console.log(password)

  if (await compare(password, user.passwordHash)) {
    const payload = { sub: user.id };
    const token = sign({ 
      exp: Math.floor(Date.now() / 1000) + (60*60*24*7),//1 week
      data: payload 
    }, secret);

    delete user.passwordHash

    ctx.body = {
      user: {
        ...user, 
        token: token 
      }
    };

    console.log(ctx.body)

  } else {
    ctx.throw(401, 'Incorrect username and/or password.');
  }

};