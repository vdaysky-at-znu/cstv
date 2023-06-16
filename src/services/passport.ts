import { promisify } from 'util';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserService from './user'
import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import RedisStore from "connect-redis";
import Redis from "ioredis";
import nextSession from "next-session";
import {promisifyStore} from "next-session/lib/compat";
import {promisifyMiddleware} from "@/services/utils";
import {IncomingMessage} from "http";
import { IUser, UserRole } from '@/database/models/user';
import container, { getService } from '@/container';

const userService = getService(UserService);

passport.serializeUser((user: Express.User, done: (err: any, id?: any) => void) => {
    const myUser = user as IUser;
    console.log('passport serialize, userId=', "" + myUser.id);
    done(null, myUser.id);
});

passport.deserializeUser((req: any, id: number, done: any) => {
  console.log('passport deserialize, userId', id);
  userService.getUser(id).then(user => {done(null, user)});
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passReqToCallback: true,
    },
    (req: any, username: string, password: string, done: any) => {
      userService.findUserWithEmailAndPassword(username, password)
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

export async function mySession(req: IncomingMessage, res: NextApiResponse, next: any) {
  await getSession(req, res);
  return await next();
}

/** Middleware that will authenticate user based on stored cookie.
 * User will be available in `request.user` */
export const requireAuth = () => createRouter<IncomingMessage, NextApiResponse>()
    .use(mySession)
    .use(promisifyMiddleware(passport.initialize()))
    .use(promisifyMiddleware(passport.session()))
    .clone();

export const requireRole = (role: UserRole) => createRouter<AuthenticatedApiRequest, NextApiResponse>()
    .use(mySession)
    .use(promisifyMiddleware(passport.initialize()))
    .use(promisifyMiddleware(passport.session()))
    .use(async (req, res, next) => {
        if (req?.user?.role === role) {
            await next();
        } else {
            res.status(403).end();
        }
    });

/** Middleware that will authenticate user based on login and password */
export const logIn: ((req: any, res: any, next: any) => Promise<unknown>) = promisifyMiddleware(passport.authenticate('local'));

export type AuthenticatedApiRequest = NextApiRequest & {
    user: IUser;
}
