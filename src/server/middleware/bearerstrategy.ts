import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';

import DB from '../db';
import { ValidateToken } from '../utils/security/tokens';

passport.use(new BearerStrategy.Strategy(async (token, done) => {

  try {
    let payload = await ValidateToken(token);
    let [user] = await DB.Users.findOneById(payload.userId);

    if(user) {
        done(null, user);
    } else {
        done(null, false);
    }
  } catch(e) {
    done(e);
  }

}));