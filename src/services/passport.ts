import { promisify } from 'util';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserWithEmailAndPassword, getUser } from './user'
import {User, UserRole} from "../database/models";
import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import RedisStore from "connect-redis";
import Redis from "ioredis";
import nextSession from "next-session";
import {promisifyStore} from "next-session/lib/compat";

passport.serializeUser((user: Express.User, done: (err: any, id?: any) => void) => {
    const myUser = user as User;
    console.log('passport serialize, userId=', "" + myUser.id);
    done(null, myUser.id);
});

passport.deserializeUser((req: any, id: number, done: any) => {
  console.log('passport deserialize, userId', id);
  getUser(id).then(user => {done(null, user)});
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passReqToCallback: true,
    },
    (req: any, username: string, password: string, done: any) => {
        findUserWithEmailAndPassword(username, password)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false, { message: 'Email or password is incorrect' });
          }
        });
    }
  )
);

export const getSession = nextSession({
    store: promisifyStore(
        new RedisStore({
            client: new Redis(),
            ttl: 7 * 24 * 60 * 60,
        })
    ),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
        path: '/',
        sameSite: 'strict',
    },
    touchAfter: 7 * 24 * 60 * 60, // 1 week
    autoCommit: true,
});

export async function mySession(req: NextApiRequest, res: NextApiResponse, next: any) {
  await getSession(req, res);
  await next();
}

/** Middleware that will authenticate user based on stored cookie.
 * User will be available in `request.user` */
export const requireAuth = () => createRouter<NextApiRequest, NextApiResponse>()
    .use(
        mySession
    )
    .use(passport.initialize() as any)
    .use(passport.session())
    .clone();

export const requireRole = (role: UserRole) => createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(requireAuth)
    .use(async (req, res, next) => {
        if (req.user.role === role) {
            await next();
        } else {
            res.status(403).end();
        }
    });

/** Middleware that will authenticate user based on login and password */
export const logIn: ((req: any, res: any, next: any) => Promise<unknown>) = promisify(passport.authenticate('local'));

export type AuthenticatedApiRequest = NextApiRequest & {
    user: User;
}