import { createClient } from 'redis';
import RedisStore from 'connect-redis';

import nextSession from 'next-session';
import { expressSession, promisifyStore } from 'next-session/lib/compat';

const redisOptions = {
  legacyMode: true,
};
// const RedisStore = connectRedis(expressSession);
const redisClient = createClient(redisOptions);
// delete redisClient.scanIterator;

redisClient.connect().catch((e) => {
  console.error('Session Redis Error', e);
});

const getSession = nextSession({
  store: promisifyStore(
    new RedisStore({
      client: redisClient as any,
      ttl: 1 * 7 * 24 * 60 * 60,
    })
  ),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
    path: '/',
    sameSite: 'strict',
  },
  touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
});

export default async function session(req, res, next) {
  await getSession(req, res);
  await next();
}