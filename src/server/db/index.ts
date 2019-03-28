import * as mysql from 'mysql';
import config from '../config';
import Categories from './queries/Categories';
import Tokens from './queries/Tokens';
import Users from './queries/Users';
import Books from './queries/Books';

export const Pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Pool.query(query, values, (err, results) => {
      if (err) reject(err);
      return resolve(results);
    })
  })
}

export default {
  Categories,
  Tokens,
  Users,
  Books
}