import * as mysql from 'mysql';
import config from '../config';

export const Pool = mysql.createPool(config.mysql);