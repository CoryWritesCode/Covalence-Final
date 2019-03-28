import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import DB from '../../db';

export const CreateToken = async (payload: IPayload) => {

  let tokenId: any = await DB.Tokens.insert(
    payload.userid,
  );

  payload.accesstokenid = tokenId.insertId;
  payload.unique = crypto.randomBytes(32).toString('hex');

  let token = await jwt.sign(
    payload,
    config.auth.secret
  );

  await DB.Tokens.update(
    payload.accesstokenid,
    token
  );

  return token;
}

export const ValidateToken = async (token: string) => {

  let payload: IPayload = <IPayload>jwt.decode(token);


  let [accesstoken] = await DB.Tokens.one(
    payload.accesstokenid,
    token
  );

  if (accesstoken) {
    return payload;
  } else {
    throw new Error('Invalid token. Get outta here!!');
  }
}

interface IPayload {
  [key: string]: any;
  userid: number;
  unique?: string;
}
