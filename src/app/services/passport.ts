import { promisify } from 'util';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserWithEmailAndPassword, getUser } from '../services/user'

passport.serializeUser((user, done) => {
  console.log('passport serialize, userId=', "" + user.id);
  done(null, "" + user.id);
});

passport.deserializeUser((req, id, done) => {
  console.log('passport deserialize, userId', parseInt(id));
  getUser(parseInt(id)).then(user => ({fakeuser: true}));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passReqToCallback: true,
    },
    (req: any, username: string, password: string, done: any) => {
        console.log("Passport resolve user");
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

export const actions = [
  promisify(passport.initialize()),
  promisify(passport.session()),
];

export const passportAuth = promisify(passport.authenticate('local'));

export default passport;
